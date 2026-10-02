const db = require('../database/db');
const cacheService = require('./cacheService');

async function getAllProducts() {
  return await db.readData();
}

async function getProductById(id) {
  const products = await db.readData();
  return products.find(p => p.id == id);
}

async function addProduct(newProduct) {
  const products = await db.readData();
  products.push(newProduct);
  await db.writeData(products);
  cacheService.clear();
  return newProduct;
}

async function updateProduct(id, updatedData) {
  const products = await db.readData();
  const product = products.find(p => p.id == id);
  if (product) {
    Object.assign(product, updatedData);
    await db.writeData(products);
    cacheService.clear();
    return product;
  }
  return null;
}

async function deleteProduct(id) {
  const products = await db.readData();
  const filtered = products.filter(p => p.id != id);
  await db.writeData(filtered);
  cacheService.clear();
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
