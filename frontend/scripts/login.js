document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const statusMsg = document.getElementById("login-status");

  if (!email || !senha) {
    statusMsg.textContent = "Preencha todos os campos.";
    return;
  }

  fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("adm_token", data.token);
        window.location.href = "dashboard.html";
      } else {
        statusMsg.textContent = data.mensagem || "Credenciais inválidas.";
      }
    })
    .catch(err => {
      console.error(err);
      statusMsg.textContent = "Erro ao conectar com o servidor.";
    });
});