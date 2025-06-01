const fs = require('fs');
const path = require('path');

const produtosPath = path.join(__dirname, '../models/produtos.json');

function getProdutos() {
  const data = fs.readFileSync(produtosPath, 'utf-8');
  return JSON.parse(data);
}

exports.listarProdutos = (req, res) => {
  const produtos = getProdutos();
  res.json(produtos);
};

exports.obterProduto = (req, res) => {
  const produtos = getProdutos();
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json(produto);
};