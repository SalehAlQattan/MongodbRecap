// library
const express = require('express');
const router = express.Router();

// controllers
const {
  fetchProducts,
  createProduct,
  fetchSingleProduct,
  deleteProduct,
  updateProduct,
} = require('./controllers');

// param middleware
router.param('productId', async (req, res, next, productId) => {
  const product = await fetchSingleProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error('Product Not Found!');
    error.status = 404;
    next(error);
  }
});

// fetch all products
router.get('/', fetchProducts);

// create product
router.post('/', createProduct);

// delete product
router.delete('/:productId', deleteProduct);

// update product
router.put('/:productId', updateProduct);

module.exports = router;
