document.getElementById("registro-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const statusMsg = document.getElementById("registro-status");

  if (!nome || !email || !senha) {
    statusMsg.textContent = "Preencha todos os campos corretamente.";
    return;
  }

  fetch("http://localhost:5000/api/admin/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha })
  })
    .then(res => res.json())
    .then(data => {
      if (data.sucesso) {
        statusMsg.style.color = "lightgreen";
        statusMsg.textContent = "Registro realizado com sucesso!";
        setTimeout(() => window.location.href = "login.html", 2000);
      } else {
        statusMsg.textContent = data.mensagem || "Erro ao registrar.";
      }
    })
    .catch(err => {
      console.error(err);
      statusMsg.textContent = "Erro ao conectar com o servidor.";
    });
});