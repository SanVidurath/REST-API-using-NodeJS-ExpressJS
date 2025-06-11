import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }   
});

app.post('/products', async (req, res) => {
    const { name, price, quantity } = req.body;

    try {
        const product = new Product({ name, price, quantity });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error });
    }
});


app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);  
    } catch (error) {
        res.status(400).json({ message: 'Invalid product ID', error });
    }
});

app.put('/products/:id', async (req, res) => {
    const { name, price, quantity } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data or ID', error });
    }
});


app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid product ID', error });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

