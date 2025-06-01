const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');

router.get('/', controller.listarProdutos);
router.get('/:id', controller.obterProduto);

module.exports = router;