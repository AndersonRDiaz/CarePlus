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
            const WEBHOOK_URL = 'https://careplus.app.n8n.cloud/webhook-test/triagem';

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const dados = await response.json();
                
                const divResultado = document.getElementById('resultado-ia');
                const textoAnalise = document.getElementById('texto-analise');

                // Exibe o card de resultado da IA
                divResultado.style.display = 'block';
                textoAnalise.innerHTML = dados.analise;

                // Esconde a área de status/erro
                statusArea.classList.add('d-none');
                
                divResultado.scrollIntoView({ behavior: 'smooth' });
                form.reset();
                valorDor.textContent = '5'; // Reseta o contador de dor visual
            } else {
                throw new Error('Erro na resposta do n8n');
            }

        } catch (error) {
            console.error('Erro:', error);
            statusMensagem.className = 'alert alert-danger shadow-sm';
            statusMensagem.textContent = 'Erro: Não foi possível conectar ao n8n.';
        } finally {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar para Análise da IA';
        }
    });
});