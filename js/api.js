/**
 * @fileoverview Funções de integração com a API Open-Meteo para busca de clima e geocodificação.
 */

/**
 * Busca as coordenadas (latitude e longitude) de uma cidade.
 * * @async
 * @param {string} cidade - O nome da cidade a ser pesquisada.
 * @returns {Promise<Object>} Um objeto contendo latitude, longitude e nome da cidade.
 * @throws {Error} Lança um erro se a cidade não for encontrada ou a entrada estiver vazia.
 * @example
 * const local = await buscarCoordenadas("Nova Iguaçu");
 */
async function buscarCoordenadas(cidade) {
    if (!cidade.trim()) throw new Error("A entrada não pode estar vazia.");

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`Cidade "${cidade}" não encontrada.`);
    }

    const { latitude, longitude, name } = data.results[0];
    return { latitude, longitude, name };
}

/**
 * Busca os dados meteorológicos atuais com base em coordenadas.
 * * @async
 * @param {number} lat - Latitude da localização.
 * @param {number} lon - Longitude da localização.
 * @returns {Promise<Object>} Dados de temperatura e código de clima.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
async function buscarClima(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Falha ao buscar dados climáticos.");
    
    return await response.json();
}

// Lógica de manipulação do DOM (Interface)
document.getElementById('searchBtn')?.addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value;
    const feedback = document.getElementById('feedback'); // Opcional: para mostrar erros na tela

    try {
        const coords = await buscarCoordenadas(cityInput);
        const weather = await buscarClima(coords.latitude, coords.longitude);
        
        // Atualiza a tela (Exemplo)
        document.getElementById('cityName').textContent = coords.name;
        document.getElementById('tempDisplay').textContent = `${Math.round(weather.current_weather.temperature)}°`;
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});