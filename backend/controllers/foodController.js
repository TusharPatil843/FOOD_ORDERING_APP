import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item

const addFood = async(req,res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        description: req.body.description,
        category : req.body.category

    })

    try {
        await food.save();
        res.json({success : true , message : "Food added"})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : "Failed to add food"})
        
    }
}

// List food items

const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});

        res.json({success : true , data : foods})
    } catch (error) {
        console.log(error);
        res.json({success : false , message : error})
    }
}

const removeFood = async (req,res) =>{
    try {
        const foodItem = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success : true, message :"Food removed" , data : foodItem})
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

export {addFood,listFood , removeFood}