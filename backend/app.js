// ==============================
// Importações e configurações
// ==============================
const express = require('express');
const cors = require('cors');

// Importação das rotas
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// ==============================
// Rotas da API
// ==============================

// Produtos (versão do usuário)
app.use('/api/products', productRoutes);

// Administrador (painel ADM)
app.use('/api/admin', adminRoutes);

// Rota base de teste
app.get('/', (req, res) => {
  res.send("LuxCommerce Backend Ativo");
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});