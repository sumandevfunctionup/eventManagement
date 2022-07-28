const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const route=require('./route/route.js');
app.use(bodyparser.json());
mongoose.connect("mongodb+srv://sumandev:aBosU15RXTGZYkKq@cluster0.4du2i.mongodb.net/eventmanagementpro?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err))
app.use('/', route);


app.listen(process.env.PORT||3000,function(){
    console.log('app running on port',(process.env.PORT||3000))
});