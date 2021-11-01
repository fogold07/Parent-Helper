const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true, //vérifie un unique pseudo
            trim: true //supprime les espaces
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail], //controle l'email
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6
        },
        bio:{
            type: String,
            max: 1024
        },
        followers: {
            type: [String]
        }, 
        following:{
            type:[String]
        },
        likes:{
            type: [String]
        }
    },
    {
        timestamps: true, // permet de donner une creatAt & updateAt
    }
)

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
