let crafting = ""
let craftingList = ""
const inputPesquisa = document.getElementById('input_pesquisa');
const btnText = document.getElementById('btn-text');

function normalizeString(str) {
    if (str === null || str === undefined) {
        return ''; // Retorna uma string vazia ou outro valor padrão
    }
    // Remover espaços em branco
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    return str;
}

function getCraftingItemImage(recipe, itemLista) {
    let recipeList = ""
    let pesquisa = ""
    for (let i = 0; i < recipe.length; i++) {
        if (recipe[i] !== null) {
            if (Array.isArray(recipe[i])) {
                pesquisa = recipe[i][0]; // Pega o primeiro elemento da lista caso varias receitas sejam possiveis
            } else {
                pesquisa = recipe[i]
            }
            const item = itemLista.find(item => item.name === pesquisa);
            if (item) {
                recipeList += `<div class="craft slot"><img src="${item.image}"></div>`;
            }
        }
        else {
            recipeList += `<div class="craft slot"></div>`; // Sem item na posição retorna nada, coloca uma div vazia
        }
    }
    return recipeList
}

function getItemImage(item, itensLista) {
    for (let j = 0; j < itensLista.length; j++) {
        const iten = itensLista.find(iten => iten.name === item);
        if (iten) {
            return `<img src="${iten.image}"></img>`;
        }
    }
}

async function pesquisar() {
    let section = document.getElementById("resultados-pesquisa")
    let craftingList = ""
    const itens = await items.then(resultado => {
        return resultado
    }).catch(resultado => {console.log(resultado)})

    crafting = await dados.then(resultado => {
        return resultado
    }).catch(resultado => {console.log(resultado)})

    for (let craft of crafting) {
        let namespaceItem = normalizeString(craft.item)
        let namespacePesquisa = normalizeString(inputPesquisa.value)
        if (namespaceItem.includes(namespacePesquisa)) { // verifica se item é igual pesquisa
            craftingList += `
            <div class="item-resultado">
                <h2>${craft.item}</h2>
                <div id="craft">
                    ${getCraftingItemImage(craft.recipe, itens)}
                </div>
                <div>
                    <span class="craft-arrow"></span>
                </div>
                <div style="align-content: center;">
                    <div class="craft result">${craft.quantity > 1 ? `<span>${craft.quantity}</span>` : ''}${getItemImage(craft.item, itens)}</div>
                </div>
            </div>
            `
        }
    }
    if (craftingList.length == 0) {
        section.innerHTML = "Nothing found"
    } else {
        section.innerHTML = craftingList
    }
}

function atualizarTextoBotao() {
    if (inputPesquisa.value.trim() === '') {
        btnText.textContent = 'Show All';
    } else {
        btnText.textContent = 'Search';
    }
}
// Adiciona um event listener ao input
inputPesquisa.addEventListener('input', atualizarTextoBotao);
// Chama a função inicialmente para setar o texto correto
atualizarTextoBotao();