let express = require("express");
let router = express.Router();
let UserController = require("../controller/user.controller.js");

router.get("/getAllUserDetails", UserController.getAllUserDetails);
router.post("/storeUserDetails", UserController.storeUserDetails);
router.put("/incrementNumOfTries", UserController.incrementNumOfTries);
router.put("/lockUserOut", UserController.lockUserOut);
router.put("/reset", UserController.resetNumOfTries);
router.put("/addToCart/:id", UserController.addToCart);
router.put("/transferFunds", UserController.transferFunds);

router.get("/getUserDetailsById/:id",async (req,res)=>{
    let id = req.params.id;
    try{
        const user = await UserController.getUserDetailById(id);
        res.json(user); 
    }catch(e){
        res.send(e);
    }

});

router.patch('/updateProfile/:id', async(req,res)=>{
    let id = req.params.id;
    const reqBody = req.body; 
    let updateObj = {};
    //console.log(reqBody)
    try{
        const oldProfile = await UserController.getUserDetailById(id)
        //console.log(oldProfile)
        if(reqBody.firstName && reqBody.firstName !== oldProfile.firstName){
            updateObj.firstName= reqBody.firstName
        }
        if(reqBody.lastName && reqBody.lastName !== oldProfile.lastName){
            updateObj.lastName= reqBody.lastName
        }
        if(reqBody.birthday && reqBody.birthday !== oldProfile.birthday){
            updateObj.birthday= reqBody.birthday
        }
        if(reqBody.Phone && reqBody.Phone !== oldProfile.Phone){
            updateObj.Phone= reqBody.Phone
        }
        if(reqBody.address1 && reqBody.address1 !== oldProfile.address.street1){
            updateObj.street1= reqBody.address1
        }
        if(reqBody.address2 && reqBody.address2 !== oldProfile.address.street2){
            updateObj.street2= reqBody.address2
        }
        if(reqBody.city && reqBody.city !== oldProfile.address.city){
            updateObj.city= reqBody.city
        }
        if(reqBody.state && reqBody.state !== oldProfile.address.state){
            updateObj.state= reqBody.state
        }
        if(reqBody.zip && reqBody.zip !== oldProfile.address.zip){
            updateObj.zip= reqBody.zip
        }
        if(reqBody.email && reqBody.email !== oldProfile.email){
            updateObj.email= reqBody.email
        }
    }catch(e){
        res.send('Product not Found!')
    }
    try{
       const updatedProfile = await UserController.updateProfile(id, updateObj);
       res.send('Profile update successful')
    }catch(e){
        res.send(e);
    }
})

router.get("/loadUser/:id", UserController.loadUser)
router.put("/delete/:id", UserController.deleteFromCart);
router.post("/checkout/:id", UserController.checkout);
router.put("/emptyCart/:id", UserController.emptyCart);
router.put("/updateQuantity/:id", UserController.updateQuantity);
router.put("/pushNewCart/:id", UserController.pushNewCart);
router.put("/decreaseFund/:id", UserController.decreaseFunds);
router.get("/getOrderDetails/:id", UserController.getOrder);
router.delete("/deleteOrder/:id", UserController.deleteOrder);
router.put("/increaseFunds/:id", UserController.increaseFunds);

module.exports = router;