const fs = require("fs");
const path = require("path");

const adminPath = path.join(__dirname, "../models/admins.json");
const produtosPath = path.join(__dirname, "../models/produtos.json");
// const pedidosPath = path.join(__dirname, "../models/pedidos.json"); // futuro

function lerAdmins() {
  const data = fs.readFileSync(adminPath, "utf-8");
  return JSON.parse(data);
}

function salvarAdmins(admins) {
  fs.writeFileSync(adminPath, JSON.stringify(admins, null, 2), "utf-8");
}

exports.registrarAdmin = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  const admins = lerAdmins();
  const existente = admins.find(a => a.email === email);

  if (existente) {
    return res.status(409).json({ mensagem: "Este e-mail já está registrado." });
  }

  const novoAdmin = {
    id: admins.length + 1,
    nome,
    email,
    senha
  };

  admins.push(novoAdmin);
  salvarAdmins(admins);

  res.status(201).json({ sucesso: true, mensagem: "Administrador registrado com sucesso." });
};

exports.loginAdmin = (req, res) => {
  const { email, senha } = req.body;

  const admins = lerAdmins();
  const admin = admins.find(a => a.email === email && a.senha === senha);

  if (!admin) {
    return res.status(401).json({ mensagem: "Credenciais inválidas." });
  }

  // Geraria token real com JWT futuramente
  res.json({
    sucesso: true,
    token: "adm-token-fake", 
    nome: admin.nome
  });
};

exports.dadosDashboard = (req, res) => {
  let totalProdutos = 0;
  let totalAdmins = 0;
  let totalPedidos = 0; // Pode ser fixo por enquanto

  try {
    const produtos = JSON.parse(fs.readFileSync(produtosPath, "utf-8"));
    totalProdutos = produtos.length;
  } catch (err) {
    console.warn("⚠️ Não foi possível ler produtos.json");
  }

  try {
    const admins = JSON.parse(fs.readFileSync(adminPath, "utf-8"));
    totalAdmins = admins.length;
  } catch (err) {
    console.warn("⚠️ Não foi possível ler admins.json");
  }

  res.json({
    produtos: totalProdutos,
    admins: totalAdmins,
    pedidos: totalPedidos
  });
};