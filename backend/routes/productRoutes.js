const express = require('express');
const router = express.Router();

// Produtos de exemplo
let produtos = [
  { id: 1, nome: 'Camiseta Premium', preco: 79.90 },
  { id: 2, nome: 'Tênis Esportivo', preco: 199.90 }
];

// @route   GET /api/products
// @desc    Listar todos os produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// @route   POST /api/products
// @desc    Adicionar novo produto
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

module.exports = router;