const Express=require('express');
const app= Express();
require('../database/db');

const userRoutes=require('../router/user-router');
const blogRoutes=require('../router/blog-router');

app.use(Express.json());
app.use(userRoutes);
app.use(blogRoutes);

app.listen(8000,()=>{
    console.log('server running');
})