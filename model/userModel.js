const mongoose = require('mongoose');  

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please enter a username']
    },
    email:{
        type:String,
        required:true, 
        unique:[true, 'This email address is already registered']
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please enter a password'],
    },
},
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('User', userSchema);