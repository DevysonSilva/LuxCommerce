const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fs = require("fs");
const path = require("path");

const adminsPath = path.join(__dirname, "../models/admins.json");

// ROTAS JÁ EXISTENTES
router.post("/registro", adminController.registrarAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/dashboard", adminController.dadosDashboard);

// NOVAS ROTAS DO PAINEL DE ADMINISTRADORES

// Ler JSON
function lerAdmins() {
  if (!fs.existsSync(adminsPath)) return [];
  const data = fs.readFileSync(adminsPath, "utf-8");
  return JSON.parse(data);
}

function salvarAdmins(admins) {
  fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2));
}

// GET - Listar todos
router.get("/", (req, res) => {
  const admins = lerAdmins();
  res.json(admins);
});

// POST - Cadastrar novo
router.post("/", (req, res) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
  }
  
  const admins = lerAdmins();
  const existe = admins.find(a => a.email === email);
  
  if (existe) {
    return res.status(409).json({ erro: "E-mail já cadastrado." });
  }
  
  const novo = {
    id: Date.now(),
    email,
    senha
  };
  
  admins.push(novo);
  salvarAdmins(admins);
  res.status(201).json(novo);
});

// DELETE - Remover admin
router.delete("/:id", (req, res) => {
  const admins = lerAdmins();
  const id = parseInt(req.params.id);
  
  const admin = admins.find(a => a.id === id);
  if (!admin) return res.status(404).json({ erro: "Admin não encontrado." });
  
  if (admin.email === "adm@gmail.com") {
    return res.status(403).json({ erro: "Administrador principal não pode ser removido." });
  }
  
  const atualizados = admins.filter(a => a.id !== id);
  salvarAdmins(atualizados);
  res.json({ mensagem: "Administrador removido com sucesso." });
});

router.get('/dashboard', adminController.dadosDashboard);

module.exports = router;