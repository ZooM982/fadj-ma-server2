const Product = require("../models/Product");

// Route pour récupérer tous les produits
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route pour récupérer les détails d'un produit par son ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};


// Route pour ajouter un nouveau produit
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, groupename } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      groupename,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};
