const signup = require('express').Router();
const clientModel = require('../models/client.model');
const bcrypt = require('bcrypt');
const {check , validationResult}=require('express-validator')
signup.post('/handleRegister',
check('email').isEmail(),
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
check('phone').matches(/^(01)[0512][0-9]{8}$/)
,async(req,res)=>{
    const{firstName , lastName , username , password , email , phone ,gender, address} = req.body 
    const errors = validationResult(req)
    console.log(errors.array());
    if(errors.isEmpty()){
        let client = await clientModel.findOne({email:email.toLowerCase()});
        if(client){
            res.render('signup.ejs' ,{errors: [{ param: 'exists email' }],oldInputs:{firstName , lastName , username , password , email , phone ,gender, address}})
        }
        else{
            client = await clientModel.findOne({username});
            if(client){
                res.render('signup.ejs' ,{errors: [{ param: 'exists username' }],oldInputs:{firstName , lastName , username , password , email , phone ,gender, address}})
            }
            else{
            bcrypt.hash(password, 7 , async(err, hash)=> {
                await clientModel.insertMany({firstName , lastName , email:email.toLowerCase() ,username, password : hash , gender , phone ,address});
                let client = await clientModel.findOne({email:email.toLowerCase()});
                res.redirect(`/home/${client._id}`)
        });
        }
        }
    }
    else{
        res.render('signup.ejs' ,{errors:errors.array(),oldInputs:{firstName , lastName , username , password , email , phone ,gender, address}})
    }

})
module.exports=signup