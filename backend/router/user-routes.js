const express = require('express');
const router = express.Router();
const {UserSchemaModel}=require('../database/model');

router.get('/',(req,res)=>{
    res.send('welcome to homepage')
})

router.post('/signup',async(req,res)=>{
    const user=new UserSchemaModel(req.body)
    try{
        await user.save();
        res.send({user:user});
    }
    catch(error){
        console.log(error);
    }
})

module.exports=router