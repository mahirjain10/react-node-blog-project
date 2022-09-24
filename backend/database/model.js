const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})


UserSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
const UserSchemaModel=mongoose.model('User',UserSchema);
module.exports=UserSchemaModel;