const products = require('../models/Product');

exports.getAllProducts = (req, res) => {
  res.json(products);
};