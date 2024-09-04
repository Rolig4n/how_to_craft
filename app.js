const url = 'https://minecraft-api.vercel.app/api/';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

async function getItems() {
    // Enviar para a API
    const response = await fetch(url+'items', options);
    const apiResponse = await response.json();
    // Exibir o resultado
    console.log(apiResponse);
}

async function getBlocks() {
    // Enviar para a API
    const response = await fetch(url+'blocks', options);
    const apiResponse = await response.json();
    // Exibir o resultado
    console.log(apiResponse);
}

async function getRecipes() {
    // Enviar para a API
    const response = await fetch(url+'crafting-recipes', options);
    const apiResponse = await response.json();
    // Exibir o resultado
    console.log(apiResponse);
}