require('dotenv').config();
require('express-async-errors');

const connectDB = require('./db/connect');
// Async Errors

const express = require('express');
const app = express();

const productsRoutes = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middlewares
app.use(express.json());


// Routes 
app.get('/', (req, res) => {
    res.send('<h1>Store API!</h1><a href="api/v1/products">Products Here!</a>');
});

app.use('/api/v1/products', productsRoutes);

// Products Routes


// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        // Connect DB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App Is Listenening on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();