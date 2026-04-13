# ☁️ SphereTempo

Aplicativo de previsão do tempo desenvolvido com HTML, CSS e JavaScript puro, focado em performance e responsividade.

## 📋 Descrição
O **SphereTempo** permite que o usuário pesquise as condições climáticas de qualquer cidade em tempo real. A interface é inteligente e se adapta visualmente ao período do dia (dia/noite) e às condições meteorológicas. O projeto foi construído seguindo boas práticas de modularização e possui testes unitários para garantir a confiabilidade dos dados.

## ✨ Funcionalidades
* **Busca Inteligente:** Localização de cidades via API de geocodificação.
* **Dados Detalhados:** Exibição de temperatura, sensação térmica, umidade e velocidade do vento.
* **Previsão Estendida:** Visualização dos próximos 4 dias com temperaturas máximas e mínimas.
* **Interface Adaptativa:** Tema visual que muda conforme o clima e o horário.
* **Cache Inteligente:** Armazenamento temporário via `localStorage` (validade de 10 minutos) para economia de dados.
* **Totalmente Responsivo:** Experiência otimizada para celulares, tablets e desktops.
* **Tratamento de Erros:** Mensagens claras para cidades não encontradas ou falhas de conexão.

## 🛠️ Tecnologias
* **HTML5 / CSS3** (Com foco em Flexbox e Grid)
* **JavaScript (ES6+)** (Modularizado)
* **API Open-Meteo** — Dados meteorológicos gratuitos.
* **Jest** — Para automação de testes unitários.

## 📁 Estrutura de Pastas
```text
projeto_clima/
├── CSS/
│   └── style.css
├── js/
│   ├── api.js
│   └── main.js
├── __tests__/ 
│   └── api.test.js
├── index.html
├── package.json
├── NOTICE.md
└── README.md
📄 Licença
Este projeto está licenciado sob licença MIT. Consulte o arquivo LICENSE para mais detalhes.

🚀 Como Executar
Clone o repositório:

Bash
git clone [https://github.com/MarciaFogaca/projeto_clima.git](https://github.com/MarciaFogaca/projeto_clima.git)
Abra o arquivo index.html no seu navegador.

🧪 Testes
Este projeto utiliza o Jest para validar a integração com a API.

Bash
# Instalar dependências
npm install

# Executar testes
npm test
🔎 Análise de Segurança & Ética
Privacidade: Não coletamos dados sensíveis dos usuários.

Transparência: Uso de APIs abertas com atribuição de créditos.

Resiliência: Validação de inputs e tratamento de exceções para evitar quebras de interface.

🙏 Créditos
API Open-Meteo — Dados meteorológicos (CC BY 4.0).

Google Fonts — Tipografia.

Bootstrap Icons / Weather Icons — Elementos visuais.

👩‍💻 Autora
Márcia Telles Fogaça - Desenvolvedora FullStack em formação.
🔗 Meu GitHub
🔗 Meu LinkedIn
