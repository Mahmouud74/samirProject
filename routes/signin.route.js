const signin = require('express').Router()
const clientModel = require('../models/client.model');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
signin.get('/signin',(req,res)=>{
    res.render('signin.ejs',{errors:[],oldInputs:{}})
})
signin.post('/handleSignIn',async(req,res)=>{
    const {email , password} = req.body
    let client = await clientModel.findOne({email:email.toLowerCase()})
    if(client){
        const match = await bcrypt.compare(password, client.password); 
        if(match){
            res.redirect(`/home/${client._id}`);
        }
        else{
            res.render('signin.ejs' ,{errors: [{ param: 'password Incorrect' }],oldInputs:{email , password}})
        }
    }
    else{
        res.render('signin.ejs' ,{errors: [{ param: 'email Incorrect' }],oldInputs:{email , password}})
    }
})
signin.get('/logout',(req,res)=>{
    res.redirect('/signin')
})
signin.get('/home/contact-us',(req,res)=>{
    res.render('contact-us.ejs')
})
signin.get('/home/clubs',(req,res)=>{
    res.render('clubs.ejs')
})
signin.get('/home/clubs/alahly',(req,res)=>{
    res.render('alahly.ejs')
})
signin.get('/home/blog',(req,res)=>{
    res.render('blog.ejs')
})
signin.get('/home/blog-advice',(req,res)=>{
    res.render('blog-advice.ejs')
})
signin.get('/home/blog-advice2',(req,res)=>{
    res.render('blog-advice2.ejs')
})
signin.get('/home/blog-advice3',(req,res)=>{
    res.render('blog-advice3.ejs')
})
module.exports=signin;