# 🏥 Care Plus | Triagem Inteligente com IA

Este projeto é um sistema de triagem hospitalar moderna desenvolvido para a **Care Plus**. Ele utiliza Inteligência Artificial para analisar sinais vitais e níveis de dor, auxiliando a equipe médica na tomada de decisão e priorização de atendimentos.

## 🚀 Funcionalidades

- **Triagem Digital:** Formulário intuitivo para coleta de sinais vitais e escala de dor (0-10).
- **Dashboard Médico:** Visão centralizada de 10 colunas com indicadores de casos críticos e fluxo de atendimento.
- **Análise Preditiva:** Integração com IA para sugerir o nível de risco do paciente.
- **Interface Responsiva:** Desenvolvida com Bootstrap para uso em tablets e desktops.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.
- **Gráficos:** Chart.js.
- **Backend/Orquestração:** n8n.
- **Banco de Dados:** PostgreSQL (Docker).
- **Editor:** VS Code.

## 📂 Estrutura do Projeto

```text
├── index.html          # Tela de formulário de triagem
├── dashboard.html      # Painel de controle médico
├── style.css           # Estilos globais e da triagem
├── dashboard-style.css # Estilos específicos do painel
├── scripts.js          # Lógica de envio e validação
├── scripts-dash.js     # Lógica de gráficos e tabelas
└── img/                # Assets, logos e ícones