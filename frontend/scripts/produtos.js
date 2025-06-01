// ========================
// Proteção de acesso
// ========================
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// ========================
// Botão logout
// ========================
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// ========================
// Carregar produtos do backend
// ========================
function carregarProdutos() {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(produtos => {
      const container = document.getElementById("produtos-lista");
      container.innerHTML = "";
      
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto-card");
        card.innerHTML = `
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <div class="card-actions">
            <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
            <button class="btn-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar produtos:", err);
    });
}

carregarProdutos();

// ========================
// Adicionar novo produto
// ========================
const form = document.getElementById("form-novo-produto");
const nomeInput = document.getElementById("nome-produto");
const precoInput = document.getElementById("preco-produto");
const statusMsg = document.getElementById("status-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const novoProduto = {
    nome: nomeInput.value.trim(),
    preco: parseFloat(precoInput.value)
  };
  
  if (!novoProduto.nome || isNaN(novoProduto.preco)) {
    statusMsg.textContent = "Preencha todos os campos corretamente.";
    statusMsg.style.color = "yellow";
    return;
  }
  
  fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto)
    })
    .then(res => res.json())
    .then(() => {
      statusMsg.textContent = "✅ Produto adicionado com sucesso!";
      statusMsg.style.color = "#0f0";
      nomeInput.value = "";
      precoInput.value = "";
      carregarProdutos();
      setTimeout(() => (statusMsg.textContent = ""), 3000);
    })
    .catch(() => {
      statusMsg.textContent = "Erro ao adicionar produto.";
      statusMsg.style.color = "red";
    });
});

// ========================
// Excluir produto
// ========================
function excluirProduto(id) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        carregarProdutos();
      })
      .catch(err => {
        console.error("Erro ao excluir produto:", err);
      });
  }
}

// ========================
// Editar produto (com modal)
// ========================
let produtoEditandoId = null;

function editarProduto(id) {
  fetch(`http://localhost:5000/api/products/${id}`)
    .then(res => res.json())
    .then(produto => {
      produtoEditandoId = id;
      document.getElementById("edit-nome").value = produto.nome;
      document.getElementById("edit-preco").value = produto.preco;
      document.getElementById("modal-editar").classList.remove("hidden");
    })
    .catch(err => {
      alert("Erro ao carregar dados do produto.");
      console.error(err);
    });
}

function fecharModal() {
  document.getElementById("modal-editar").classList.add("hidden");
  produtoEditandoId = null;
}

document.getElementById("form-editar-produto").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nome = document.getElementById("edit-nome").value.trim();
  const preco = parseFloat(document.getElementById("edit-preco").value);
  
  if (!nome || isNaN(preco)) {
    alert("Preencha corretamente!");
    return;
  }
  
  fetch(`http://localhost:5000/api/products/${produtoEditandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco })
    })
    .then(res => res.json())
    .then(() => {
      fecharModal();
      carregarProdutos();
    })
    .catch(err => {
      alert("Erro ao editar produto.");
      console.error(err);
    });
});