const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel')


router.post("/reg", async(req, res) => {
    try{
        
        const user = {
            name : req.body.name, 
            email : req.body.email,
            mobile : req.body.mobile,
            password : req.body.password,
            confirmPass:req.body.confirmPass
        }
        
        // const alredyReg = await User.findOne(user.email)
        // if(alredyReg){
        //     res.send ("User already exists" );
        //     return 0;
        // }
       
        if(user.password != user.confirmPass){
            res.send("password not matched")
            return -1;
        }
        
        const hashPass = await  bcrypt.hash(user.password, 10)
        const userDb = {
            name : req.body.name, 
            email : req.body.email,
            mobile : req.body.mobile,
            password : hashPass,
            
        }
        const newUser = new User(userDb);
        await newUser.save()
        res.send(newUser);
        
    }catch(err){
        res.send(err)
    }
})

router.post("/login", async(req, res) => {
    try{
        
        const mobile =req.body.mobile
        const password = req.body.password
        
        const result = await User.findOne({mobile:mobile})
        if(!result){
            res.send("no user found")
            success:false
        }else{
        const valid = await bcrypt.compare(password,result.password);
        if(!valid){
            res.send("worng pass")
            success:false
        } else {
            const token = jwt.sign({userId:result.id,name:result.name,mobile: result.mobile, email: result.email }, "perera_cluster")
          
            res.send({token:token,  success:true})

        }
    }
        
    }catch(err){
        res.send(err)
    }

   

})

router.post("/view", async(req, res) =>{
    try{
        const token = req.body.token
        const payload = await jwt.verify(token, "perera_cluster")
        res.send(payload)
       
    }catch(err){
        res.send(err)
    }
})

router.put("/update", async(req, res) =>{
    try{
        const id = req.body.id
       
        const hashPas1= await  bcrypt.hash(req.body.password, 10)
       
        const updateUser = {
            name : req.body.name, 
            email : req.body.email,
            mobile : req.body.mobile,
            password : hashPas1,
            
        }
       
        const UpdateUser1 = await User.findByIdAndUpdate(id, updateUser)
        res.send(UpdateUser1)

    }catch(err){
        res.send(err)
    }
})
module.exports = router;