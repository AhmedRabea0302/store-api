require('dotenv').config();
const jsonProducts = require('./products.json');
const connectDB = require('./db/connect');
const product = require('./models/product');


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await product.deleteMany();
        await product.create(jsonProducts);
        process.exit(0);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

start();