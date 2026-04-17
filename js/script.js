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
                const dados = await response.json(); // Pega o JSON {"analise": "..."} que configuramos no n8n
                
                const divResultado = document.getElementById('resultado-ia');
                const textoAnalise = document.getElementById('texto-analise');

                // Faz a div aparecer
                divResultado.style.display = 'block';

                // Insere o texto que a IA gerou
                textoAnalise.innerHTML = dados.analise;

                // Limpa o erro anterior, se houver
                document.getElementById('mensagem-erro').style.display = 'none'; 
                
                // Faz scroll automático para o resultado
                divResultado.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Se der erro (como o erro de conexão que aparece na tua foto)
                const erroDiv = document.getElementById('mensagem-erro');
                erroDiv.style.display = 'block';
                erroDiv.textContent = "Erro: Não foi possível obter a análise da IA.";
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            statusMensagem.className = 'alert alert-danger shadow-sm';
            statusMensagem.textContent = 'Error: Não foi possível conectar ao n8n';
        } finally {
            btnEnviar.disabled = false;
        }
    });
});