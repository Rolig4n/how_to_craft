function normalizeString(str) {
    if (str === null) {
        return ''; // Ou qualquer outro valor padrão desejado
    }
    // Remover espaços em branco
    str = str.replace(/\s+/g, '_');
    // Remove acentos
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Converter para minúsculas
    str = str.toLowerCase();
    return str;
}

let section = document.getElementById("resultados-pesquisa")
dados.then(resultado => {
    for (let craft of resultado) {
        const namespacedId = normalizeString(craft.item)
        console.log(craft.recipe[0])
        section.innerHTML += `
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
                <div class="craft result"><span>${craft.quantity}</span><img src="https://minecraft-api.vercel.app/images/items/${namespacedId}.png"></div>
            </div>
        </div>
    `
    }
})