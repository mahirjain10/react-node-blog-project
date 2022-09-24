const Express=require('express');
const app= Express();
require('../database/db');

const routes=require('../router/user-routes');

app.use(Express.json());
app.use(routes);

app.listen(8000,()=>{
    console.log('server running');
})