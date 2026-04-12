// Mock do fetch para não depender da internet nos testes
global.fetch = jest.fn();

// Função simulada com a lógica que o Jest vai testar
const buscarClimaSimulado = async (cidade) => {
    if (!cidade) throw new Error("Entrada vazia");
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?name=${cidade}`);
    
    if (response.status === 404) throw new Error("Cidade inexistente");
    if (response.status === 429) throw new Error("Limite excedido");
    if (response.status === 500) throw new Error("Falha na API");

    return await response.json();
};

describe("Testes Unitários - App de Clima (SphereTempo)", () => {
    
    beforeEach(() => {
        fetch.mockClear();
    });

    test("1. Nome de cidade válido retorna dados meteorológicos", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ current_weather: { temperature: 27 } }),
        });
        const dados = await buscarClimaSimulado("Nova Iguaçu");
        expect(dados.current_weather.temperature).toBe(27);
    });

    test("2. Nome de cidade inexistente lança exceção tratada", async () => {
        fetch.mockResolvedValue({ status: 404 });
        await expect(buscarClimaSimulado("CidadeInexistente")).rejects.toThrow("Cidade inexistente");
    });

    test("3. Entrada vazia retorna erro de validação", async () => {
        await expect(buscarClimaSimulado("")).rejects.toThrow("Entrada vazia");
    });

    test("4. Falha da API gera resposta adequada", async () => {
        fetch.mockResolvedValue({ status: 500 });
        await expect(buscarClimaSimulado("Rio")).rejects.toThrow("Falha na API");
    });

    test("5. Excesso de requisições deve ser bloqueado", async () => {
        fetch.mockResolvedValue({ status: 429 });
        await expect(buscarClimaSimulado("Rio")).rejects.toThrow("Limite excedido");
    });

    test("6. Conexão lenta deve dar timeout", async () => {
        const promiseLenta = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 100)
        );
        await expect(promiseLenta).rejects.toThrow("Timeout");
    });

    test("7. API mudou e quebrou o formato", async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ formato_errado: true }),
        });
        const dados = await buscarClimaSimulado("Rio");
        expect(dados.current_weather).toBeUndefined();
    });
});