const mongoose  = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name:String,
    password:String,
    tasks:[
        {
            desc:{type:String },
            status: {type:Number,default:0}
        }
    ]
},{collection:'Users'});

let User = mongoose.model('User',UserSchema);;
module.exports = User;
