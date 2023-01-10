const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    
    const queryObject = {};
    const { name, company, featured, sort } = req.query;

    name ? queryObject.name = { $regex: name, $options: 'i' } : '';
    company ? queryObject.company = company : '';
    featured ? queryObject.featured = featured : '';

    let result = Product.find(queryObject);
    // Sorting Part
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = products.sort(sortList);
    } else {
        result = products.sort('createdAt');
    }
    // Selecting Part
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'Products Route'});
}


module.exports = { 
    getAllProductsStatic,
    getAllProducts
}