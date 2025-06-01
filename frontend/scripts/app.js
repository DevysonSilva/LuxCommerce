document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("active");
});

const form = document.querySelector('#produto-form');
const nomeInput = document.querySelector('#nome');
const precoInput = document.querySelector('#preco');
const statusMsg = document.querySelector('#mensagem-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const novoProduto = {
    nome: nomeInput.value,
    preco: parseFloat(precoInput.value),
  };
  
  fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    })
    .then(res => res.json())
    .then(data => {
      statusMsg.textContent = 'Produto adicionado com sucesso!';
      nomeInput.value = '';
      precoInput.value = '';
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 3000);
      location.reload(); // recarrega a lista
    })
    .catch(err => {
      statusMsg.textContent = 'Erro ao adicionar produto.';
      console.error(err);
    });
});