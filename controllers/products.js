
const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'Testing Products Route'});
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'Products Route'});
}


module.exports = { 
    getAllProductsStatic,
    getAllProducts
}