const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const pedidosPath = path.join(__dirname, '../models/pedidos.json');

function lerPedidos() {
  if (!fs.existsSync(pedidosPath)) return [];
  const data = fs.readFileSync(pedidosPath, 'utf-8');
  return JSON.parse(data);
}

function salvarPedidos(pedidos) {
  fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));
}

// Listar todos os pedidos
router.get('/', (req, res) => {
  const pedidos = lerPedidos();
  res.json(pedidos);
});

// Criar novo pedido (usado pelo usuário futuramente)
router.post('/', (req, res) => {
  const pedidos = lerPedidos();
  const novo = {
    id: Date.now(),
    cliente: req.body.cliente,
    produtos: req.body.produtos,
    total: req.body.total,
    status: 'Pendente',
    data: new Date().toISOString()
  };
  pedidos.push(novo);
  salvarPedidos(pedidos);
  res.status(201).json(novo);
});

// Atualizar status
router.put('/:id', (req, res) => {
  const pedidos = lerPedidos();
  const pedido = pedidos.find(p => p.id == req.params.id);
  if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

  pedido.status = req.body.status || pedido.status;
  salvarPedidos(pedidos);
  res.json(pedido);
});

// Deletar pedido
router.delete('/:id', (req, res) => {
  let pedidos = lerPedidos();
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

  pedidos.splice(index, 1);
  salvarPedidos(pedidos);
  res.json({ mensagem: 'Pedido removido' });
});

module.exports = router;