const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    firstName:{type:String},
    secondName:{type:String},
    gender:{type:String , enum:["male","female"]},
    username:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    address:{type:String}
})
module.exports=mongoose.model('client',clientSchema);