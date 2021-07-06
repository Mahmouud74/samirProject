const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const clientModel = require('./models/client.model')
const {check , validationResult} = require('express-validator');
const signin=require('./routes/signin.route');
const signup = require('./routes/signup.route');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(signin);
app.use(signup)
app.get('/',(req,res)=>{
   // res.sendFile(path.join(__dirname,'..','views','/index.html'))})
   res.render('signup.ejs',{errors:[],oldInputs:{} })
})
app.get('/home/:id',(req,res)=>{
    res.render('index.ejs')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.vk4zz.mongodb.net/sportAngel',{useNewUrlParser:true,useUnifiedTopology:true});
app.listen(3000,()=>{
    console.log("bsm allah");
})