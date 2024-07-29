import { response } from 'express';
import userModel from '../models/userModel.js'

// add item to user cart

const addToCart = async (req, res) => {
    try {
        // Find the user by ID
        const userData = await userModel.findOne({ _id:req.body.userId });

        // Ensure that cartData is an object (initialize if not present)
        const cartData =  userData.cartData ;

        // Update the cartData for the specified item
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Save the updated cartData back to the user model
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
        

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.json({ success: false, message: "Error" });
    }
};

//remove items from user cart

const removeFromCart = async(req,res)=>{
    // try {
    //     let userData = await userModel.findById(req.body.userId);
    //     let cartData = userData.cartData;
    //     if (cartData[req.body.itemId]>0) {
    //         cartData[req.body.itemId] -= 1;
    //     }
    //     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    //     res.json({ success: true, message: "Removed from Cart" });
    // } catch (error) {
    //     console.log(error);
    //     res.json({ success: false, message:"error"});
    // }
};

//fetch user cart

const getCart = async(req,res)=>{
    // try {
    //     let userData = await userModel.findById(req.body.userId);
    //     let cartData =  userData.cartData;
    //     response.json({ success: true,cartData})
    // } catch (error) {
    //     console.log(error);
    //     res.json({ success: false, message:"error"});
    // }
};

export{addToCart, removeFromCart, getCart}