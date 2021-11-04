const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
        picture:{
            type: String,
            default:"./uploads/profil/random-user.png"
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
        timestamps: true, // permet de donner une createAt & updateAt
    }
);

// play function before sace into display: 'block'
userSchema.pre("save", async function(next){
    // salage du mot de passe avec genSalt()
    const salt = await bcrypt.genSalt();
    // affecte au mot de passe, le mot de passe crypté
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
