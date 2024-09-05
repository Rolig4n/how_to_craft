const url = 'https://minecraft-api.vercel.app/api/';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

async function getRecipes() {
    // Enviar para a API
    const response = await fetch(url+'crafting-recipes', options);
    const apiResponse = await response.json();
    
    return apiResponse
}
async function getItems() {
    // Enviar para a API
    const response = await fetch(url+'items', options);
    const apiResponse = await response.json();
    
    return apiResponse
}

let dados = getRecipes()
let items = getItems()