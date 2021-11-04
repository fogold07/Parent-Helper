// Controle de l'authentification du User
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // recherche tous les users et renvoie toutes les données sauf le password sous format json
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// get info d'un seul utilisateur avec le req.params pour écupérer les données saisies dans l'URL
module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

   UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID inconnu : ' + err);
   }).select('-password');
};

module.exports.updateUser = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id)

    try{
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({message: err});
            }
        )
    } catch(err) {
        return res.status(500).json({message: err});
    }
};
