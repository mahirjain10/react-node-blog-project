const express = require('express');
const router = express.Router();
const UserSchemaModel=require('../database/model');

router.get('/',(req,res)=>{
    res.send('welcome to homepage')
})

// for signup
router.post('/signup',async(req,res)=>{
    const user=new UserSchemaModel(req.body)
    console.log("user : "+user);
    try{
        await user.save();
        res.status(201).send({
            user:user,
            msg: 'success',
            statusCode: res.statusCode
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
})


// for login
router.post('/login',async(req,res)=>{
    const {name,email,password}=req.body;
    const  data = await UserSchemaModel.findOne({email});
    console.log(data);
    try{
        if(data===null){
            res.status(403).send({message:"email doesnt exist"});
        }
        else{
            console.log('password : '+data.password);
            if(password!==data.password){
                res.status(401).send({message:"password doesnt match"});
            }
            else{
                console.log(data);
                res.send({message:"you are logged in"});
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({error});
    }
})


// for getting all user
router.get('/getAllUsers',async(req,res)=>{
    const data= await UserSchemaModel.find({});
    try{
        if(!data){
            console.log(data);
            res.status(403).send({message:"data doesnt exists"});
        }
        else{
            console.log(data);
            res.status(200).send({data});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
})
router.patch('/update-user/:id',async(req,res)=>{
    const{email,password,name}=req.body;
    const data= await UserSchemaModel.findOneAndUpdate({_id:req.params.id},req.body);
    try{
        if(!data){
            console.log(data);
            res.status(400).json({message:"user not found"});    
        }
        else{
            console.log(data);
            res.status(200).json({data,message:"user updated successfully"});
        }
    }
    catch(error){
       console.log(error);
       res.status(400).json({error});     
    }    
})
router.delete('/delete-user/:id',async(req,res)=>{
    const data= await UserSchemaModel.findByIdAndDelete(req.params.id);
    try{
       if(!data){
        res.status(404).json({data,message:"data not found"});
       }
       else{
        res.status(200).json({message:"data deleted successfully"});
       } 
    }
    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
})
module.exports=router