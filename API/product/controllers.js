const Product = require('../../db/models/Product');

// get all products
exports.fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// get single product
exports.fetchSingleProduct = async (productId, next) => {
  try {
    return await Product.findById(productId);
  } catch (error) {
    next(error);
  }
};

// create new product
exports.createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// update product
exports.updateProduct = async (req, res, next) => {
  try {
    const foundProduct = req.product;

    if (foundProduct)
      await Product.findByIdAndUpdate(foundProduct.id, req.body);
    // fix the response
    res.json(foundProduct);
  } catch (error) {
    next(error);
  }
};

// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const foundProduct = req.product;
    if (foundProduct) await Product.findByIdAndDelete(foundProduct.id);
    res.status(201).end();
  } catch (error) {
    res.status(404).json({ message: 'Product Not Found' });
    next(error);
  }
};
