const express = require('express');
const router = express.Router();

// Array em memória (temporário)
let produtos = [
  { id: 1, nome: 'Camiseta Premium', preco: 79.90 },
  { id: 2, nome: 'Tênis Esportivo', preco: 199.90 }
];

// Listar produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// Adicionar produto
router.post('/', (req, res) => {
  const { nome, preco } = req.body;
  
  if (!nome || !preco) {
    return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios.' });
  }
  
  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  };
  
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Remover produto
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(prod => prod.id === id);
  
  if (index !== -1) {
    produtos.splice(index, 1);
    res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
});

module.exports = router;