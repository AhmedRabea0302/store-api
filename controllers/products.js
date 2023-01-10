const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    
    const queryObject = {};
    const { 
        name, 
        company, 
        featured,
        sort, 
        fields, 
        numericFilters 
    } = req.query;

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

    // Paging & Limit Part
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Numeric Filters for price AND rating
    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        }

        const regEgx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regEgx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split('-').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }

        });

    }


    result = result.skip(skip).limit(limit);

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