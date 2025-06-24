import userModel from "../models/userModel.js";


// ADD ITEMS TO USER CARTS
const addToCart = async(req,res) =>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]++;
        }

        await userModel.findByIdAndUpdate(req.body.userId , {cartData});
        res.json({
            success : true,
            message : "Added to cart"
        })
    } catch (error) {
        console.log(error);
        console.log("Error in AddToCart");
        res.json({
            success : false,
            message : "Error in AddToCart"
        })
        
    }

}

//REMOVE ITEMS FROM USER CARTS
const removeFromCart = async(req,res) =>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]){
            if(cartData[req.body.itemId] == 1){
                delete cartData[req.body.itemId];
            }
            else{
                cartData[req.body.itemId]--;
                }
        }

        await userModel.findByIdAndUpdate(req.body.userId , {cartData});
        res.json({
            success : true,
            message : "Removed from cart"
            })
    } catch (error) {
        console.log( error );
        console.log("Error in RemoveFromCart");
        res.json({
            success : false,
            message : "Error in RemoveFromCart"
            })   
    }
}

// FETCH USER CARTS DATA
const getCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.json({
            success : true,
            cartData
        })
    } catch (error) {
        console.log( error );
        console.log("Error in GetCart");
        res.json({
            success : false,
            message : "Error in GetCart"
            })
    }
}

export {addToCart, removeFromCart, getCart};