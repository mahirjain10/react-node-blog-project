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
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"BlogSchema"
    }]
})

const BlogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"UserSchema"
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
const BlogSchemaModel=mongoose.model('Blog',BlogSchema);
module.exports=UserSchemaModel;
module.exports=BlogSchemaModel;