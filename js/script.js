document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formTriagem');
    const dorRange = document.getElementById('dorRange');
    const valorDor = document.getElementById('valorDor');
    const statusArea = document.getElementById('statusArea');
    const statusMensagem = document.getElementById('statusMensagem');
    const btnEnviar = document.getElementById('btnEnviar');

    // Atualiza o valor visual da dor no formulário
    dorRange.addEventListener('input', (e) => {
        valorDor.textContent = e.target.value;
    });

    dorRange.addEventListener('input', (event) => {
    // Pega o valor onde a bolinha está (0 a 10)
    const valor = event.target.value;
    
    // Atualiza o texto do badge para o usuário ver
    displayValor.textContent = valor;
    
    });


    // Manipulação do envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Feedback visual de carregamento
        btnEnviar.disabled = true;
        statusArea.classList.remove('d-none');
        statusMensagem.className = 'alert alert-info shadow-sm';
        statusMensagem.textContent = 'Enviando dados para o n8n e processando IA...';

        // Captura os dados do formulário
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        // Adiciona um timestamp de criação
        payload.data_criacao = new Date().toISOString();

        try {
            // URL do seu Webhook no n8n (Substitua pela sua URL real)
            
            const WEBHOOK_URL = 'https://careplus.app.n8n.cloud/webhook-test/triagem';

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                statusMensagem.className = 'alert alert-success shadow-sm';
                statusMensagem.textContent = '✅ Sucesso! Triagem realizada e salva no banco de dados.';
                form.reset();
                valorDor.textContent = '5';
                
                // Esconde o alerta após 5 segundos
                setTimeout(() => {
                    statusArea.classList.add('d-none');
                }, 5000);

            } else {
                throw new Error('Falha na resposta do servidor');
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            statusMensagem.className = 'alert alert-danger shadow-sm';
            statusMensagem.textContent = '❌ Erro: Não foi possível conectar ao n8n. Verifique se o Docker está rodando.';
        } finally {
            btnEnviar.disabled = false;
        }
    });
});