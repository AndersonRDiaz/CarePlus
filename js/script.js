document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos
    const form = document.getElementById('formTriagem');
    const dorRange = document.getElementById('dorRange');
    const valorDor = document.getElementById('valorSelecionado');
    const statusArea = document.getElementById('statusArea');
    const statusMensagem = document.getElementById('statusMensagem');
    const btnEnviar = document.getElementById('btnEnviar');
    const textoAnalise = document.getElementById('texto-analise');
    const divResultado = document.getElementById('resultado-ia');

    // 1. Atualiza o valor visual da dor no formulário (Slider)
    if (dorRange && valorDor) {
        dorRange.addEventListener('input', (e) => {
            valorDor.textContent = e.target.value;
        });
    }

    // 2. Manipulação do envio do formulário
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Feedback visual de carregamento
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Processando...';
            
            if (statusArea) {
                statusArea.classList.remove('d-none');
                statusMensagem.className = 'alert alert-info shadow-sm';
                statusMensagem.textContent = 'Enviando dados e processando IA...';
            }

            // Captura os dados do formulário
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            payload.data_criacao = new Date().toISOString();

            try {
                // URL de Produção do seu n8n
                const WEBHOOK_URL = 'https://careplus.app.n8n.cloud/webhook/triagem-careplus-v2';
                
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const dados = await response.json();
                    console.log("Resposta do n8n:", dados);
                    
                    // Busca o texto nas chaves enviadas pelo n8n
                    const resultadoFinal = dados.analise || dados.Prediccao_IA || dados.output || "Análise concluída com sucesso.";
                    
                    // Exibe o resultado na tela
                    if (textoAnalise && divResultado) {
                        textoAnalise.innerText = resultadoFinal;
                        divResultado.style.display = 'block';
                        divResultado.scrollIntoView({ behavior: 'smooth' });
                    }

                    // Esconde a mensagem de "Processando"
                    if (statusArea) statusArea.classList.add('d-none');

                } else {
                    // Trata erro 500 ou outros erros de servidor
                    const errorData = await response.text();
                    console.error("Erro no servidor:", errorData);
                    throw new Error('O servidor da IA falhou. Verifique se o n8n está Ativo ou se a Groq atingiu o limite.');
                }

            } catch (error) {
                console.error('Erro detalhado:', error);
                if (statusArea && statusMensagem) {
                    statusArea.classList.remove('d-none');
                    statusMensagem.className = 'alert alert-danger shadow-sm';
                    statusMensagem.textContent = 'Erro: ' + error.message;
                }
            } finally {
                // Restaura o botão
                btnEnviar.disabled = false;
                btnEnviar.textContent = 'Enviar para Análise da IA';
            }
        });
    }
});