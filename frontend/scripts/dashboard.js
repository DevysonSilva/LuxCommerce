// Proteção de acesso
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// Botão logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// Dados fictícios (substituir depois por fetch API)
document.getElementById("produtos-count").textContent = "12";
document.getElementById("usuarios-count").textContent = "5";
document.getElementById("pedidos-count").textContent = "20";