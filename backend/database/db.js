const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://admin:r3ALMBR9QMAUrdqx@cluster0.zyxdgpc.mongodb.net/Blog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('database connected successfully')
}).catch((error)=>{
    console.log(error)
})