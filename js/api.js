// Dicionário de ícones e descrições (Requisito 2.1)
const weatherMap = {
    0: { desc: "Céu Limpo", icon: "wi-day-sunny" },
    1: { desc: "Principalmente Limpo", icon: "wi-day-cloudy" },
    2: { desc: "Parcialmente Nublado", icon: "wi-day-cloudy" },
    3: { desc: "Nublado", icon: "wi-cloudy" },
    45: { desc: "Nevoeiro", icon: "wi-fog" },
    // Adicionamos mais conforme a necessidade
};

const buscarClima = async () => {
    const cidade = document.getElementById("cityInput").value;
    
    if (!cidade) {
        alert("Digite o nome de uma cidade, Márcia!");
        return;
    }

    try {
        // 1. GEOCODIFICAÇÃO: Transforma nome em Lat/Lon
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        // Tratamento de erro: Cidade não encontrada
        if (!geoData.results) {
            throw new Error("Cidade não encontrada. Verifique a grafia!");
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2. BUSCA DO CLIMA: Usa as coordenadas obtidas
        const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
        const climaRes = await fetch(climaUrl);
        const climaData = await climaRes.json();

        const { temperature, weathercode, is_day } = climaData.current_weather;

        atualizarInterface(name, temperature, weathercode, is_day);

    } catch (erro) {
        alert(erro.message);
        console.error("Erro na busca:", erro);
    }
};

const atualizarInterface = (nome, temp, code, isDay) => {
    // 3. DATA COMPLETA (Requisito 2.1)
    const dataFormatada = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    // 4. TROCA DE FUNDO (Dia/Noite)
    document.body.className = isDay ? "bg-dia" : "bg-noite";

    const condicao = weatherMap[code] || { desc: "Clima variado", icon: "wi-cloud" };

    // Injetando no HTML
    document.getElementById("cityName").innerText = nome;
    document.getElementById("tempDisplay").innerText = `${Math.round(temp)}°`;
    document.getElementById("condition").innerText = condicao.desc;
    document.getElementById("dateInfo").innerText = dataFormatada;
    
    // Ícone dinâmico
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<i class="wi ${condicao.icon}"></i>`;
};

document.getElementById("searchBtn").addEventListener("click", buscarClima);