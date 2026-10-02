const productService = require('../services/productService');
const cacheService = require('../services/cacheService');

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    cacheService.set(req.originalUrl, products);
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    cacheService.set(req.originalUrl, product);
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function updateProduct(req, res) {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).send('Product not found');
    }
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server error');
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.id);
    res.send('Product deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
