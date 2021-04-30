const { rmSync } = require("fs");
const productModel = require("../model/product.model.js");
const reqModel = require("../model/request.model.js");
const orderModel = require("../model/order.model.js")
const validator = require('./validators')
const userModel = require("../model/user.model.js")

let getAllProductDetails = (req,res) =>{
    productModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}
 let productReqDetails = (req, res) => {
    let request = new reqModel({
        hashedPassword: req.body.pass,
        productName: req.body.productName,
        productId : req.body.productId,
        quantity: req.body.quantity,
        
    });

    request.save((err, result) => {
        if (!err) {
            res.status(200).json({"RequestSent":true});
        } else {
            res.status(422).json({"RequestSent":false});
        }
    });
};


let getProductById = async (id)=>{
    if(!validator.isNonEmptyString(id)) throw 'Can not get product with invalid Id!'
    const product = await productModel.findById(id).exec();
    if (!product) throw `There is no product with that ID: ${id}`;
    return product
}

let updateQuantity = (req, res) =>{
    let i = req.body._id;
    let n = req.params.num;
    productModel.updateOne({_id: i}, {$inc: {quantity: n}}, (err, result)=>{
        if(!err) res.send("store quantity updated");
        else res.send("could not be updated");
    });
}
let getAllOrders = (req,res) =>{
    orderModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}

let updateOrder = (req, res) =>{
    let uid = req.body._id;
    let statusC = req.body.status
    console.log(req.body)
    orderModel.updateOne({ _id: uid},{$set: {status : statusC, Comments :  req.body.comment}}, (err, result) => {
        console.log(result)
        if (!err && result.nModified > 0) {
            if(statusC == "Cancelled")
            {
                userModel.updateOne({ _id: req.body.userId},{$inc: {funds : req.body.total}}, (err1, result1) => {
                    console.log(result1)
                    if (!err1 && result1.nModified > 0) {
                        res.status(200).json({"AmountUpdated":true});
                    }
                     else {
                        console.log("Amount not updated")
                        res.status(422).json({"AmountUpdated":false});
                    }
                })
            }
            else
            {
                res.status(200).json({"StatusUpdated":true});
            }
        }
            else {
            console.log("user status not updated")
            res.status(422).json({"StatusUpdated":false});
        }
    })

   
    
}

module.exports = {getAllProductDetails, getProductById,productReqDetails, updateQuantity, getAllOrders, updateOrder};
