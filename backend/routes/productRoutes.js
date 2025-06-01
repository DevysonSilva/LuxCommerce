const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const produtosPath = path.join(__dirname, '../models/produtos.json');

function getProdutos() {
  const data = fs.readFileSync(produtosPath, 'utf-8');
  return JSON.parse(data);
}

function salvarProdutos(produtos) {
  fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2), 'utf-8');
}

// GET - listar todos
router.get('/', (req, res) => {
  const produtos = getProdutos();
  res.json(produtos);
});

// POST - adicionar
router.post('/', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco == null) {
    return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios.' });
  }
  
  const produtos = getProdutos();
  const novoProduto = {
    id: Date.now(),
    nome,
    preco
  };
  
  produtos.push(novoProduto);
  salvarProdutos(produtos);
  
  res.status(201).json(novoProduto);
});

// DELETE - remover
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = getProdutos();
  const existe = produtos.find(p => p.id === id);
  
  if (!existe) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
  
  produtos = produtos.filter(p => p.id !== id);
  salvarProdutos(produtos);
  
  res.json({ mensagem: 'Produto removido com sucesso.' });
});

module.exports = router;