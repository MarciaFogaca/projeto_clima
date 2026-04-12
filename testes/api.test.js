// testes/api.test.js
global.fetch = jest.fn();

const buscarClimaSimulado = async (lat, lon) => {
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
};

describe("Testes Unitários - SphereTempo (Etapa 5)", () => {
    beforeEach(() => { fetch.mockClear(); });

    test("1. Deve retornar temperatura e horários solares", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                current_weather: { temperature: 25 },
                daily: { sunrise: ["2026-04-12T06:00"], sunset: ["2026-04-12T18:00"] }
            })
        });
        const resultado = await buscarClimaSimulado(-22, -43);
        expect(resultado.temperature).toBe(25);
        expect(resultado.nascerSol).toBe("06:00");
    });

    test("2. Erro astronômico (Teste 8)", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                current_weather: { temperature: 20 },
                daily: { sunrise: ["2026-04-12T05:30"], sunset: ["2026-04-12T17:45"] }
            })
        });
        const resultado = await buscarClimaSimulado(0, 0);
        expect(resultado.porSol).toBe("17:45");
    });
});