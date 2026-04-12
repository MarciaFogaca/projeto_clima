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
 * Busca os dados meteorológicos atuais e astronômicos (nascer/pôr do sol).
 */
async function buscarClima(lat, lon) {
    // Adicionamos &daily=sunrise,sunset&timezone=auto para a API enviar os dados do sol
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=sunrise,sunset&timezone=auto`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Falha ao buscar dados climáticos.");
    const data = await response.json();
    
    const extrairHora = (isoString) => isoString.split('T')[1];

    return {
        temperature: data.current_weather.temperature,
        nascerSol: extrairHora(data.daily.sunrise[0]),
        porSol: extrairHora(data.daily.sunset[0])
    };
}

// Lógica de manipulação do DOM (Interface)
document.getElementById('searchBtn')?.addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value;

    try {
        const coords = await buscarCoordenadas(cityInput);
        const weather = await buscarClima(coords.latitude, coords.longitude);
        
        // Atualização dos elementos na tela
        document.getElementById('cityName').textContent = coords.name;
        document.getElementById('tempDisplay').textContent = `${Math.round(weather.temperature)}°`;
        
        // Novos campos da Etapa 5
        document.getElementById('sunriseTime').textContent = weather.nascerSol;
        document.getElementById('sunsetTime').textContent = weather.porSol;

    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});
