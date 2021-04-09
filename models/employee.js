const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', {
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')) throw new Error('Password should not contain password')
        }
    },
    username : {
        type : String,
        required: true,
        trim: true
    },
    dob: {
        type : String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
		trim : true
    }
})

module.exports = Employee