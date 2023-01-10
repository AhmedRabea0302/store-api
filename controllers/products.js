const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    
    const queryObject = {};
    const { name, company, featured, sort, fields } = req.query;

    name ? queryObject.name = { $regex: name, $options: 'i' } : '';
    company ? queryObject.company = company : '';
    featured ? queryObject.featured = featured : '';

    let result = Product.find(queryObject);
    // Sorting Part
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    // Selecting Part
    if(fields) {
        const filedsList = fields.split(',').join(' ');
        result = result.select(filedsList);
    } else {
        result = result.select()
    }

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