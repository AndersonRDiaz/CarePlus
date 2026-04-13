document.addEventListener('DOMContentLoaded', () => {
    inicializarGraficos();
    atualizarDados();
});

function inicializarGraficos() {
    // Gráfico de Linha (Tendência)
    const ctxLine = document.getElementById('chartTendencia').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [{
                label: 'Pacientes por Hora',
                data: [12, 19, 3, 5, 2, 20],
                borderColor: '#004a99',
                tension: 0.3
            }]
        }
    });

    // Gráfico de Pizza (Riscos)
    const ctxPie = document.getElementById('chartRiscos').getContext('2d');
    new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Crítico', 'Urgente', 'Estável'],
            datasets: [{
                data: [5, 12, 25],
                backgroundColor: ['#dc3545', '#ffc107', '#198754']
            }]
        }
    });
}

function atualizarDados() {
    const tabela = document.getElementById('tabelaPacientes');
    
    // Simulação de dados vindo do seu n8n/Postgres
    const pacientes = [
        { nome: "Ana Costa", idade: 65, dor: 9, vitais: "PA: 16/10 | Sat: 92%", predicao: "Risco Cardíaco Alto", status: "Crítico" },
        { nome: "Marcos V.", idade: 22, dor: 3, vitais: "PA: 12/8 | Sat: 98%", predicao: "Quadro Estável", status: "Estável" }
    ];

    tabela.innerHTML = pacientes.map(p => `
        <tr>
            <td><strong>${p.nome}</strong></td>
            <td>${p.idade}</td>
            <td>${p.dor}/10</td>
            <td><small>${p.vitais}</small></td>
            <td><em class="text-muted">${p.predicao}</em></td>
            <td><span class="badge ${p.status === 'Crítico' ? 'bg-danger' : 'bg-success'}">${p.status}</span></td>
        </tr>
    `).join('');

    // Atualiza contadores
    document.getElementById('countCritico').textContent = "1";
    document.getElementById('countTotal').textContent = pacientes.length;
}