const models = require('../model');
const validators = require('./validators')
let ProductController = require('../controller/product.controller');
const orderModel = require('../model/order.model');
let getAllProductDetails = (req, res) =>{
    ProductController.find({}, (err, result)=>{
        if(!err) res.json(result);
        else res.send(error);
    });
}
module.exports = {
    getAllProductDetails,
    async createAdmin(admin){
        if(!validators.isLettersOnly(admin.firstName))
            throw 'First name must be provided and contains only letters'
        if(!validators.isLettersOnly(admin.lastName))
            throw 'Last name must be provided and contains only letters'
        if (!validators.isValidEmail(admin.email))
            throw 'Email is not valid';
        if (!validators.isNonEmptyString(admin.hashedPassword))
            throw 'Please provide a password';
        const newAdmin = new models.Employee(admin);
        const createdAdmin = await saveSafely(newAdmin);
        return createdAdmin;
    },
    async getAdminById(id){
        if (!validators.isNonEmptyString(id)) throw 'No admin with that id found!'
        try{
            const admin = await models.Employee.findById(id).exec();
            return admin
        }catch(e){
            console.log(e);
        }

    },
    async addProduct(product){
        if(!validators.isNonEmptyString(product.name)) throw 'You must provid a product name'
        if(!validators.isPositiveNumber(product.price)) throw 'You must provid a positive product price'
        if(!validators.isPositiveNumber(product.quantity)) throw 'You must provid a positive product quantity'
        if(!validators.isNonEmptyString(product.description)) throw 'You must provid a product description'
        const newProduct = new models.Product({
            name: product.name,
            price:product.price,
            quantity:product.quantity,
            description:product.description
        });
        const createdProduct = await saveSafely(newProduct);
        return createdProduct;
    },
    async getAdminByEmail(email){
        if(!validators.isValidEmail(email)) throw 'Email address is not valid'
        return await models.Employee.findOne({$and:[{email: email.toLowerCase()}, {isAdmin:true}]});
    },
    async updateProduct(id, product){
        if (!validators.isNonEmptyString(id)) throw 'Please provide an product Id';
        const existingProduct = await models.Product.findById(id).exec();
        if (!existingProduct) throw `There is no product with that given ID: ${id}`;
        if (product.name){
            existingProduct.name = product.name
        }
        if (product.price && validators.isPositiveNumber(product.price)){
            existingProduct.price = product.price
        }
        if(product.quantity && validators.isPositiveNumber(product.quantity)){
            existingProduct.quantity = product.quantity
        }
        if(product.description){
            existingProduct.description = product.description
        }
        return await saveSafely(existingProduct);
    },
    async deleteProduct(id){
        if(!validators.isNonEmptyString(id)) throw 'Please provide an id to delete the product'
        const deletedProduct = await models.Product.findByIdAndDelete(id).exec();
        return deletedProduct
    },
    async viewRequests(){
        try{
            return await models.Request.find({}).exec();
        }catch(err){
            console.log(err)
        }
    },
    async getOrdersByDates(begin, end) {
        end = new Date(end);
        end.setDate(end.getDate()+1);
        try {
            const orders = await orderModel.find({sellDate: {$gte: begin,$lt: end}}).exec();
            return orders;
        } catch (err) {
            console.log(err)
        }
    },
};

async function saveSafely(document) {
    try {
        return await document.save();
    } catch (e) {
        throw e.message;
    }
}