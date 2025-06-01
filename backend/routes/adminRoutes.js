const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Rotas
router.post("/registro", adminController.registrarAdmin);
router.post("/login", adminController.loginAdmin);
module.exports = router;

// Importar controller, se não já tiver
const adminController = require('../controllers/adminController');

// Rota do painel
router.get('/dashboard', adminController.dadosDashboard);