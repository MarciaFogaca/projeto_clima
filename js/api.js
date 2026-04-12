// Função para buscar os dados conforme a tabela da Open-Meteo
const buscarClima = async () => {
    // Coordenadas de exemplo (São Paulo) conforme o guia
    const lat = -23.55;
    const lon = -46.63;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        // Extraindo os dados da tabela que você enviou
        const { temperature, windspeed, weathercode, time } = dados.current_weather;

        // Exibindo no console para provar que a Tarefa 1 está capturando os dados
        console.log(`Temperatura: ${temperature}°C`);
        console.log(`Vento: ${windspeed}km/h`);
        console.log(`Código do Tempo: ${weathercode}`);
        console.log(`Horário da Medição: ${time}`);

        exibirResultado(temperature, windspeed);
    } catch (erro) {
        console.error("Erro ao processar a etapa 1:", erro);
    }
};

// Função simples para cumprir o requisito de exibição inicial
const exibirResultado = (temp, vento) => {
    const display = document.getElementById("weatherResult");
    display.innerHTML = `
        <div class="result-box">
            <h2>${temp}°C</h2>
            <p>Vento: ${vento} km/h</p>
        </div>
    `;
    display.hidden = false;
};

// Evento do botão (ID do seu index.html)
document.getElementById("searchBtn").addEventListener("click", buscarClima);