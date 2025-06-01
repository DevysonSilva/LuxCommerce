// ========================
// Proteção de acesso
// ========================
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// ========================
// Logout
// ========================
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// ========================
// Carregar lista de admins
// ========================
function carregarAdmins() {
  fetch("http://localhost:5000/api/admins")
    .then(res => res.json())
    .then(admins => {
      const tbody = document.getElementById("lista-admins");
      tbody.innerHTML = "";

      admins.forEach(admin => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${admin.id}</td>
          <td>${admin.email}</td>
          <td>
            ${
              admin.email === "adm@gmail.com"
                ? "<em>Administrador principal</em>"
                : `<button class="btn-remover" onclick="removerAdmin(${admin.id})">Remover</button>`
            }
          </td>
        `;

        tbody.appendChild(tr);
      });
    });
}

carregarAdmins();

// ========================
// Cadastro de novo admin
// ========================
const form = document.getElementById("form-novo-admin");
const emailInput = document.getElementById("email-admin");
const senhaInput = document.getElementById("senha-admin");
const statusMsg = document.getElementById("admin-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoAdmin = {
    email: emailInput.value.trim(),
    senha: senhaInput.value.trim()
  };

  if (!novoAdmin.email || !novoAdmin.senha) {
    statusMsg.textContent = "Preencha todos os campos.";
    statusMsg.style.color = "yellow";
    return;
  }

  fetch("http://localhost:5000/api/admins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoAdmin)
  })
    .then(res => {
      if (!res.ok) throw new Error("Falha ao cadastrar");
      return res.json();
    })
    .then(() => {
      statusMsg.textContent = "✅ Novo admin cadastrado!";
      statusMsg.style.color = "#0f0";
      form.reset();
      carregarAdmins();
      setTimeout(() => (statusMsg.textContent = ""), 3000);
    })
    .catch(() => {
      statusMsg.textContent = "❌ Erro: e-mail já cadastrado ou falha no servidor.";
      statusMsg.style.color = "red";
    });
});

// ========================
// Remover admin
// ========================
function removerAdmin(id) {
  if (confirm("Deseja remover este administrador?")) {
    fetch(`http://localhost:5000/api/admins/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => carregarAdmins())
      .catch(() => alert("Erro ao remover admin."));
  }
}