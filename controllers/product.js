const Products = require("../model/product"); // ->this line

const getProducts = async (req, res) => {
    const results = await Products.find({});
    if (result?.length === 0 || !result) {
        return res.sendStatus(404)
    }
    res.json(results);
}



const getProductByName = async(req, res) => {
    const {name} = req.params;
    const result = await Products.findOne({name});
    console.log(result)
    if (result?.length === 0 || !result) {
        return res.sendStatus(404)
    }
    res.json(result);
}


const createProduct = async (req, res) => {
    const {name, price, category} = req.body;
    const products = await Products.create({name, price, category});
    if (!products) return res.status(404).json({ "message": "unable to create" });
    res.json(products);
}



const updateAProduct = async (req, res) => {
    const {name} = req.params;

    const {name: newName, price, category} = req.body;

    const product = await Products.findOne({name});    



    if (product?.length === 0 || !product) {
        return res.status(204).json({ "message": `No user matches an ID ${id}.`});
    }

    
    try {

        product.name = newName;
        product.price = price;
        product.category = category; 
        
        const result = await product.save();

        return res.status(200).json(result);

    } catch (error) {
        console.error(error)
    }
    
}


const deleteAllProducts = async(req, res) => {
    const results = await Products.deleteMany({});
    if (!results) return res.status(200).json({ "message": "No results found" });
    res.json(results);
}

const deleteProductByName = async(req, res) => {
    const {name} = req.params;
    const results = await Products.findOneAndDelete({name});
    if (!results) return res.status(200).json({ "message": "No results found" });
    res.status(204).json({"message": "deleted"});
}


module.exports = {getProducts, getProductByName, deleteProductByName, createProduct, deleteAllProducts, updateAProduct}; 