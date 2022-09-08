const express = require('express');
const FoodOrder = require('../models/FoodOrderModel');
const router =express.Router();

router.post('/add', (req,res)=>{
    const newFoodOrder=new FoodOrder({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        foodname:req.body.foodname,
        quantity:req.body.quantity,
        total:req.body.total,
        userid:req.body.userid
    });
    newFoodOrder
    .save()
    .then(()=>res.json("New Food Order Added"))
    .catch((err)=>res.status(400).json(`Error:${err}`));
});


router.get('/',(req,res)=>{
    FoodOrder.find().exec((err,foodOrder)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingFoodOrder:foodOrder
        });
    });
})

// router.get('/admin/:id',(req,res)=>{
//     let foodOrderId=req.params.id;
//     FoodOrder.findById(foodOrderId , (err,foodOrder)=>{
//         if(err){
//             return res.status(400).json({success:false,err});
//         }
//         return res.status(200).json({
//             success:true,
//             foodOrder
//         });
//     });
// });

router.put('/admin/update/:id' ,(req,res)=>{
    FoodOrder.findByIdAndUpdate(req.params.id)
    .then((food )=> {
        food.cmp=req.body.cmp;
        
        

        food
            .save()
            .then(() => res.json("Food details UPDATED successfully"))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});


router.delete('/admin/delete/:id',(req,res)=>{
    FoodOrder.findByIdAndRemove(req.params.id).exec((err,deletedfood)=>{
        if(err) return res.status(400).json({
          message:"Food Delete unsuccesful",err
        });
        return res.json({
            message:"Food Delete succesful",deletedfood
        });
    });
});



router.get('/book/:userid', async(req, res) =>{
    try{
       
        let booking = await FoodOrder.find({ userid: req.params.userid })
       
        res.json(booking)

    }catch(err){
        res.send(err)
    }
})









module.exports=router;