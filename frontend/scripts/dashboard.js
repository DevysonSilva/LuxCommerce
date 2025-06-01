// ========================
// Proteção de acesso
// ========================
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// ========================
// Botão de logout
// ========================
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// ========================
// Carregar dados reais do backend
// ========================
function carregarDadosDashboard() {
  fetch("http://localhost:5000/api/admin/dashboard")
    .then(res => res.json())
    .then(data => {
      document.getElementById("produtos-count").textContent = data.produtos ?? "0";
      document.getElementById("usuarios-count").textContent = data.admins ?? "0";
      document.getElementById("pedidos-count").textContent = data.pedidos ?? "0";
    })
    .catch(err => {
      console.error("Erro ao carregar dados do painel:", err);
    });
}

fetch("http://localhost:5000/api/admin/dashboard")
  .then(res => res.json())
  .then(data => {
    // Atualizar cards
    document.getElementById("total-produtos").textContent = `Produtos: ${data.totalProdutos}`;
    document.getElementById("total-pedidos").textContent = `Pedidos: ${data.totalPedidos}`;
    document.getElementById("total-admins").textContent = `Admins: ${data.totalAdmins}`;

    // Gráfico 1: status dos pedidos
    const statusCtx = document.getElementById("grafico-status").getContext("2d");
    new Chart(statusCtx, {
      type: "pie",
      data: {
        labels: Object.keys(data.pedidosPorStatus),
        datasets: [{
          label: "Status",
          data: Object.values(data.pedidosPorStatus),
          backgroundColor: ["#e50914", "#ffa500", "#00c853", "#555"]
        }]
      }
    });

    // Gráfico 2: pedidos por mês
    const mensalCtx = document.getElementById("grafico-mensal").getContext("2d");
    new Chart(mensalCtx, {
      type: "line",
      data: {
        labels: Object.keys(data.pedidosPorMes),
        datasets: [{
          label: "Pedidos por mês",
          data: Object.values(data.pedidosPorMes),
          borderColor: "#e50914",
          backgroundColor: "rgba(229, 9, 20, 0.3)",
          fill: true,
          tension: 0.4
        }]
      }
    });
  });

carregarDadosDashboard();