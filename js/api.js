// js/api.js

// Tabela de condições climáticas (WMO) exigida para converter os códigos da API
export const WMO = {
    0: { desc: 'Céu limpo', icone: 'wi wi-day-sunny' },
    1: { desc: 'Principalmente limpo', icone: 'wi wi-day-cloudy' },
    2: { desc: 'Parcialmente nublado', icone: 'wi wi-day-cloudy' },
    3: { desc: 'Nublado', icone: 'wi wi-cloudy' },
    45: { desc: 'Neblina', icone: 'wi wi-fog' },
    51: { desc: 'Garoa leve', icone: 'wi wi-sprinkle' },
    61: { desc: 'Chuva leve', icone: 'wi wi-rain' },
    63: { desc: 'Chuva moderada', icone: 'wi wi-rain' },
    80: { desc: 'Pancadas de chuva', icone: 'wi wi-showers' },
    95: { desc: 'Tempestade', icone: 'wi wi-thunderstorm' }
};

export async function buscarCoordenadas(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Erro na rede ao buscar cidade.');
    const dados = await resposta.json();
    if (!dados.results || dados.results.length === 0) throw new Error('Cidade não encontrada.');
    return dados.results[0];
}

export async function buscarClima(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Erro ao buscar dados do clima.');
    return await resposta.json();
}