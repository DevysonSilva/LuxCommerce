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

carregarDadosDashboard();