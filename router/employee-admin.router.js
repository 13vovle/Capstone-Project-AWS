let express = require("express");
let router = express.Router();
const employeeController = require("../controller/employee.controller");
const controller = require('../controller');
const adminData = controller.Admin;
const productData = controller.Product; 
const validatorData = controller.Validators;
const bcrypt = require('bcrypt');


router.get("/getAllEmpDetails", employeeController.getAllEmpDetails);
router.post("/addEmployee", employeeController.addEmployee);
router.delete("/deleteEmployeeByID/:empID", employeeController.deleteEmployeeByID);
router.put("/updateEmpDetails",employeeController.updateEmployee);
router.get("/getEmpByID/:ID", employeeController.getEmpByID);
router.get("/getAllProductDetails", productData.getAllProductDetails);


router.get('/create', async(req,res)=>{
    const hashedPassword = await bcrypt.hash('12345', 10);
    try{
        const adminOne = await adminData.getAdminByEmail('jackyyjyang@gmail.com');
        if (adminOne){
            res.send('Admins already created!');
        }else{
            let admin1 = {
                firstName: 'Jack',
                lastName:'Yang',
                email : 'jackyyjyang@gmail.com',
                hashedPassword: hashedPassword,
                isAdmin:true
            }
            const adminOne = await adminData.createAdmin(admin1);
            let admin2 = {
                firstName: 'Jacob',
                lastName:'Taylor',
                email : 'jacobtaylor3197@gmail.com',
                hashedPassword: hashedPassword,
                isAdmin:true
            }
            const adminTwo = await adminData.createAdmin(admin2);
            let admin3 = {
                firstName: 'Aneri',
                lastName:'Dalal',
                email : 'anku127@gmail.com',
                hashedPassword: hashedPassword,
                isAdmin:true
            }
            const adminThree = await adminData.createAdmin(admin3);
            let admin4 = {
                firstName: 'Chanukya',
                lastName:'Cheekati',
                email : 'chanukya.cheekati@gmail.com',
                hashedPassword: hashedPassword,
                isAdmin:true
            }
            const adminFour = await adminData.createAdmin(admin4);
            let admin5 = {
                firstName: 'Rahul',
                lastName:'Kampti',
                email : 'rahulkrishkampati@gmail.com',
                hashedPassword: hashedPassword,
                isAdmin:true
            }
            const adminFive = await adminData.createAdmin(admin5);
            res.send('Admins successfully created!')
            }
        }catch(e){
            res.sendStatus(500).send('Admin Creation failed!')
        }
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!validatorData.isNonEmptyString(email)) throw 'Must provide email to login as admin'
    if(!validatorData.isNonEmptyString(password)) throw 'Must provide password to login as admin'
    try{
        
        const admin = await adminData.getAdminByEmail(email.toLowerCase());  

        if (admin && (await bcrypt.compare(password, admin.hashedPassword))){
            //req.session.user = {_id: admin._id, email:admin.email, firstName: admin.firstName, lastName: admin.lastName}
            //res.redirect('/emp');
            res.send('Admin Login successul!')
        }else{
            res.status(400).send('Admin login failed!')
        }
    }catch(e){
        res.status(400).send(e)
    }  
});

router.post('/addProduct', async(req,res)=>{
    const {name, price, quantity, description } = req.body
    if(!validatorData.isNonEmptyString(name)) throw 'Product name must be non-empty string!'
    if(!validatorData.isPositiveNumber(price)) throw 'Product price must be a positive number!'
    if(!validatorData.isPositiveNumber(quantity)) throw 'Product quantity must be a positive number!'
    if(!validatorData.isNonEmptyString(description)) throw 'Product description must be non-empty string!'

    let newProd = {
        name, price, quantity, description 
    }
    try{
        await adminData.addProduct(newProd)
        res.send('Product added successfully!')
    }catch(e){
        res.sendStatus(500).send('Error adding product')
    }
});

router.patch('/updateProduct/:id', async(req,res)=>{
    const reqBody = req.body; 
    let updateObj = {};
    try{
        const oldProduct = await productData.getProductById(req.params.id)
        if(reqBody.name && reqBody.name !== oldProduct.name){
            updateObj.name= reqBody.name
        }
        if(reqBody.price && reqBody.price !== oldProduct.price){
            updateObj.price= reqBody.price
        }
        if(reqBody.quantity && reqBody.quantity !== oldProduct.quantity){
            updateObj.quantity= reqBody.quantity
        }
        if(reqBody.description && reqBody.description !== oldProduct.description){
            updateObj.description= reqBody.description
        }
    }catch(e){
        res.status(404).send('Product not Found!')
    }

    try{
        const updatedProduct = await adminData.updateProduct(req.params.id, updateObj)
        res.send('Product update Successful!')
    }catch(e){
        res.status(500).send('Product update failed!')
    }
});

router.delete('/deleteProduct/:id', async(req,res)=>{
    let id = req.params.id
    if(!validatorData.isNonEmptyString(id)) throw 'Must enter valid id to delete product'
    try{
       let deletedProduct =  await adminData.deleteProduct(id);
       res.send('Product successfully deleted!')
    }catch(e){
        res.send(e)
    }
});

router.get('/getAllRequests', async(req,res)=>{
    try{
        const requestData = await adminData.viewRequests()
        res.json(requestData);
    }catch(err){
        res.send(err);
    }
})

router.get("/getOrdersByDates/:begin/:end", async(req,res)=> {
    let begin = req.params.begin;
    let end = req.params.end;
    try {
        const orders = await adminData.getOrdersByDates(begin, end);
        res.json(orders);
        // console.log(orders);
    }catch(err){
        res.send(err);
    }
})

module.exports = router;