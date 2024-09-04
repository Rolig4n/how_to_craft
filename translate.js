const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

// Função para traduzir um texto
async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}

// Fluxo da aplicação
async function processData(portugueseText) {
  // Traduzir para o inglês
  const englishText = await translateText(portugueseText, 'en');

  // Enviar para a API
  const response = await fetch('/api/endpoint', {
    method: 'POST',
    body: JSON.stringify({ text: englishText })
  });
  const apiResponse = await response.json();

  // Traduzir a resposta para o português
  const portugueseResponse = await translateText(apiResponse.result, 'pt-BR');

  // Exibir o resultado
  console.log(portugueseResponse);
}