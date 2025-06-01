// ===========================
// MENU RESPONSIVO (Mobile)
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link =>
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    hamburger.classList.remove('active');
  })
);

// Toggle de outro menu (caso haja mais de um)
const menuToggle = document.getElementById("menu-toggle");
menuToggle?.addEventListener("click", () => {
  document.getElementById("navbar")?.classList.toggle("active");
});

// ===========================
// ANIMAÇÃO AO SCROLL
// ===========================
const fadeElements = document.querySelectorAll('.fade-in-down');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// ===========================
// NEWSLETTER – ALERTA DE ENVIO
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  newsletterForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    Swal.fire({
      title: 'Inscrição confirmada!',
      text: `O e-mail ${email} foi cadastrado com sucesso.`,
      icon: 'success',
      confirmButtonText: 'Fechar',
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#e50914',
    });
    
    newsletterForm.reset();
  });
});

let cartCount = 0;
let cartTotal = 0;
const cartItems = [];
const cartIcon = document.getElementById('cart-icon');
const cartCountSpan = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');

// Função para atualizar o DOM do carrinho
function atualizarCarrinho() {
  cartItemsContainer.innerHTML = '';
  cartTotal = 0;
  
  cartItems.forEach((item, index) => {
    cartTotal += item.preco;
    
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <strong>${item.nome}</strong><br>
      Preço: R$${item.preco.toFixed(2)}<br>
      <button class="remover-item" data-index="${index}">Remover</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
  
  cartTotalDisplay.textContent = `Total: R$${cartTotal.toFixed(2)}`;
  
  // Exibir se houver itens
  const mostrar = cartItems.length > 0;
  cartItemsContainer.style.display = mostrar ? 'block' : 'none';
  cartTotalDisplay.style.display = mostrar ? 'block' : 'none';
}

// Evento de clique no ícone do carrinho
cartIcon.addEventListener('click', () => {
  const visivel = cartItemsContainer.style.display === 'block';
  if (cartItems.length > 0) {
    cartItemsContainer.style.display = visivel ? 'none' : 'block';
    cartTotalDisplay.style.display = visivel ? 'none' : 'block';
  }
});

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  cartItems.push({ nome, preco });
  cartCount++;
  cartCountSpan.textContent = cartCount;
  atualizarCarrinho();
  
  Swal.fire({
    title: 'Adicionado!',
    text: `Você adicionou ${nome} ao carrinho.`,
    icon: 'success',
    confirmButtonText: 'Fechar',
    background: '#1a1a1a',
    color: '#ffffff',
    confirmButtonColor: '#e50914',
  });
}

// Evento para remover item
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remover-item')) {
    const index = e.target.getAttribute('data-index');
    cartItems.splice(index, 1);
    cartCount--;
    cartCountSpan.textContent = cartCount;
    atualizarCarrinho();
  }
});



// ===========================
// SISTEMA DE PRODUTOS (CRUD)
// ===========================
const form = document.querySelector('#produto-form');
const nomeInput = document.querySelector('#nome');
const precoInput = document.querySelector('#preco');
const statusMsg = document.querySelector('#mensagem-status');
const lista = document.querySelector('#produtos');

// 🔁 Carregar produtos ao iniciar
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

// ➕ Evento de envio do formulário
form?.addEventListener('submit', (e) => {
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
      carregarProdutos();
      setTimeout(() => statusMsg.textContent = '', 3000);
    })
    .catch(err => {
      statusMsg.textContent = '❌ Erro ao adicionar produto.';
      console.error(err);
    });
});

carregarProdutos();