const fs = require("fs");
const path = require("path");

const adminPath = path.join(__dirname, "../models/admins.json");

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