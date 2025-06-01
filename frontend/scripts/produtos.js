// Proteção de acesso
if (!localStorage.getItem("adm_token")) {
  window.location.href = "login.html";
}

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("adm_token");
  window.location.href = "login.html";
});

// Simulação de dados (iremos substituir por fetch real)
const produtos = [
  { id: 1, nome: "Camiseta Premium", preco: 129.90 },
  { id: 2, nome: "Moletom Lux", preco: 199.90 },
  { id: 3, nome: "Action Figure", preco: 249.90 }
];

const container = document.getElementById("produtos-lista");

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

// Funções vazias por enquanto
function editarProduto(id) {
  alert(`Editar produto ID ${id}`);
}

function excluirProduto(id) {
  alert(`Excluir produto ID ${id}`);
}