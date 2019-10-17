const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true        
    },
    age:{
        type: Number        
    },
    name:{
        type: String,
        required: true
    },
    IC:{
        type: String,
        unique: true
    },
    address:{
        type: String,        
    },
    contactNumber:{

    }
})