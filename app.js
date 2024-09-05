function normalizeString(str) {
    if (Array.isArray(str)) {
        str = str[0]; // Pega o primeiro elemento da lista
    }
    if (str === null || str === undefined) {
        return ''; // Retorna uma string vazia ou outro valor padrão
    }
    // Remover espaços em branco
    str = str.replace(/\s+/g, '_')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    return str;
}

let section = document.getElementById("resultados-pesquisa")
let itens = ""
let crafting_list = ""

function pesquisar() {
    dados.then(resultado => {
        items.then(resultado => {
            itens = resultado
        }).catch(resultado => {console.log(resultado)})
        for (let craft of resultado) {
            let namespacedId = normalizeString(craft.item)
            crafting_list += `
            <div class="item-resultado">
                <h2>${craft.item}</h2>
                <div id="craft">
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[0])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[1])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[2])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[3])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[4])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[5])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[6])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[7])}.png"></div>
                    <div class="craft slot"><img src="https://minecraft-api.vercel.app/images/items/${normalizeString(craft.recipe[8])}.png"></div>
                </div>
                <div>
                    <span class="craft-arrow"></span>
                </div>
                <div style="align-content: center;">
                    <div class="craft result">${craft.quantity > 1 ? `<span>${craft.quantity}</span>` : ''}<img src="https://minecraft-api.vercel.app/images/items/${namespacedId}.png"></div>
                </div>
            </div>
        `
        }
        section.innerHTML = crafting_list
    }).catch(resultado => {console.log(resultado)})
}