const foodPartnerModel = require('../models/foodpartner.model')
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req,res){

    const foodPartnerId = req.params.id;


    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner : foodPartnerId});
    const totalMeals = foodItemsByFoodPartner.length;

        console.log("FOOD ITEMS 👉", foodItemsByFoodPartner); // 👈 ADD THIS


    if(!foodPartner){
        return res.status(404).json({ message : "Food Partner not found"});

    }

    res.status(200).json({
        message : "Food partner retrieved successfully",
        foodPartner : {
            ...foodPartner.toObject(),
            foodItems : foodItemsByFoodPartner,
            totalMeals: totalMeals,
            customersServed: totalMeals * 10 
        }
    });
}

module.exports = {
    getFoodPartnerById
};