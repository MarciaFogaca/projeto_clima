// js/main.js
import { buscarCoordenadas, buscarClima, WMO } from './api.js';

// Selecionando os elementos conforme os IDs do seu HTML (SphereTempo)
const input = document.getElementById('cityInput');
const btn = document.getElementById('searchBtn');

async function processarBusca() {
    const cidade = input.value.trim();
    if (!cidade) return;

    try {
        // 1. Busca as coordenadas usando sua função do api.js
        const local = await buscarCoordenadas(cidade);
        
        // 2. Busca o clima usando as coordenadas obtidas
        const dadosClima = await buscarClima(local.latitude, local.longitude);

        // 3. Atualiza os campos do seu design (SphereTempo)
        document.getElementById('cityName').textContent = local.name;
        document.getElementById('tempDisplay').textContent = `${Math.round(dadosClima.current.temperature_2m)}°C`;
        
        // Busca a descrição e o ícone na tabela WMO
        const info = WMO[dadosClima.current.weather_code] || { desc: 'Nublado', icone: 'wi wi-day-cloudy' };
        document.getElementById('condition').textContent = info.desc;
        document.getElementById('mainIcon').className = info.icone;

        // Atualiza o grid de detalhes
        document.getElementById('humidity').textContent = `${dadosClima.current.relative_humidity_2m}%`;
        document.getElementById('windSpeed').textContent = `${dadosClima.current.wind_speed_10m}km/h`;
        document.getElementById('apparentTemp').textContent = `${Math.round(dadosClima.current.apparent_temperature)}°`;

        // Atualiza o rodapé (Sunrise/Sunset)
        document.getElementById('sunriseTime').textContent = dadosClima.daily.sunrise[0].split('T')[1];
        document.getElementById('sunsetTime').textContent = dadosClima.daily.sunset[0].split('T')[1];

        // AJUSTE FINAL: Chama a função para desenhar a previsão de 5 dias na tela
        renderizarPrevisao(dadosClima.daily);

        console.log("Interface atualizada com sucesso para:", local.name);

    } catch (erro) {
        console.error("Erro na busca:", erro);
        alert(erro.message);
    }
}

function renderizarPrevisao(daily) {
    const lista = document.getElementById('forecastList');
    lista.innerHTML = ''; // Limpa os tracinhos atuais

    // Começamos do índice 1 para mostrar os próximos dias
    for (let i = 1; i < daily.time.length; i++) {
        const data = new Date(daily.time[i] + 'T12:00:00');
        const diaNome = data.toLocaleDateString('pt-BR', { weekday: 'short' });
        
        // Busca o ícone na tabela WMO
        const condicao = WMO[daily.weather_code[i]] || { icone: 'wi wi-day-cloudy' };

        const item = document.createElement('div');
        
        // Estilização dinâmica para manter seu design limpo
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '10px 0';
        item.style.borderBottom = '1px solid rgba(255,255,255,0.1)';

        item.innerHTML = `
            <span style="width: 50px; text-transform: capitalize;">${diaNome}</span>
            <i class="${condicao.icone}" style="font-size: 1.2rem; color: #78b9e6;"></i>
            <span style="font-weight: bold;">
                ${Math.round(daily.temperature_2m_max[i])}° / 
                <span style="opacity: 0.6;">${Math.round(daily.temperature_2m_min[i])}°</span>
            </span>
        `;
        lista.appendChild(item);
    }
}

// Configura o evento de clique e o Enter
btn.addEventListener('click', processarBusca);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') processarBusca();
});