document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formTriagem');
    const dorRange = document.getElementById('dorRange');
    const valorDor = document.getElementById('valorDor');
    const statusArea = document.getElementById('statusArea');
    const statusMensagem = document.getElementById('statusMensagem');
    const btnEnviar = document.getElementById('btnEnviar');

    // Atualiza o valor visual da dor no formulário
    dorRange.addEventListener('input', (e) => {
        valorDor.textContent = e.target.value; // Corrigido para usar a variável correta
    });

    // Manipulação do envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Feedback visual de carregamento
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Processando...';
        statusArea.classList.remove('d-none');
        statusMensagem.className = 'alert alert-info shadow-sm';
        statusMensagem.textContent = 'Enviando dados para o n8n e processando IA...';

        // Captura os dados do formulário
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        payload.data_criacao = new Date().toISOString();

        try {
            // URL do seu Webhook no n8n Cloud
            const WEBHOOK_URL = 'https://careplus.app.n8n.cloud/webhook/triagem';

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

        if (response.ok) {
            const dados = await response.json();
            console.log("O que o n8n mandou:", dados);
            
            const textoAnalise = document.getElementById('texto-analise');
            const divResultado = document.getElementById('resultado-ia');
            const statusArea = document.getElementById('statusArea');

            // Define o resultado buscando em qualquer uma das chaves possíveis
            const resultadoFinal = dados.output || dados.analise || (typeof dados === 'string' ? dados : JSON.stringify(dados));

            // Exibe o resultado na tela
            textoAnalise.innerHTML = resultadoFinal;
            divResultado.style.display = 'block';
            
            // Esconde a barra de carregamento/erro
            if (statusArea) statusArea.classList.add('d-none');

            // Rola a tela suavemente até o resultado
            divResultado.scrollIntoView({ behavior: 'smooth' });

        } else {
            throw new Error('Erro na resposta do servidor');
        }
        } catch (error) {
            console.error('Erro:', error);
            statusArea.classList.remove('d-none');
            statusMensagem.className = 'alert alert-danger shadow-sm';
            statusMensagem.textContent = 'Erro ao processar a solicitação: ' + error.message;
        } finally {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar';``
        }
    });
});