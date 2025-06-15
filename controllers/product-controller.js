import Product from '../models/product.js';

export const createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const product = new Product({ name, price, quantity });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length === 0) {
    return res.status(200).json({ message: 'No products found' });
  }
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data or ID' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
};
