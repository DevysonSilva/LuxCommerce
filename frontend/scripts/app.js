document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("active");
});

const form = document.querySelector('#produto-form');
const nomeInput = document.querySelector('#nome');
const precoInput = document.querySelector('#preco');
const statusMsg = document.querySelector('#mensagem-status');
const lista = document.querySelector('#produtos');

// 🔁 Função para listar produtos
function carregarProdutos() {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(produtos => {
      lista.innerHTML = '';
      produtos.forEach(prod => {
        const item = document.createElement('li');
        item.innerHTML = `
          <strong>${prod.nome}</strong> - R$${prod.preco.toFixed(2)}
          <button class="remover" data-id="${prod.id}" style="margin-left:10px;">🗑️</button>
        `;
        lista.appendChild(item);
      });

      document.querySelectorAll('.remover').forEach(botao => {
        botao.addEventListener('click', () => {
          const id = botao.getAttribute('data-id');
          fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(() => carregarProdutos());
        });
      });
    });
}

// 🧾 Evento de envio do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const novoProduto = {
    nome: nomeInput.value.trim(),
    preco: parseFloat(precoInput.value),
  };

  if (!novoProduto.nome || isNaN(novoProduto.preco)) {
    statusMsg.textContent = 'Preencha todos os campos corretamente.';
    return;
  }

  fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    })
    .then(res => res.json())
    .then(data => {
      statusMsg.textContent = '✅ Produto adicionado com sucesso!';
      nomeInput.value = '';
      precoInput.value = '';
      carregarProdutos(); // atualiza lista sem recarregar página
      setTimeout(() => statusMsg.textContent = '', 3000);
    })
    .catch(err => {
      statusMsg.textContent = '❌ Erro ao adicionar produto.';
      console.error(err);
    });
});

// Carregar produtos ao iniciar
carregarProdutos();