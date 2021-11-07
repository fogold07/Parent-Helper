// Controle de l'authentification du User
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    // recherche tous les users et renvoie toutes les données sauf le password sous format json
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// get info d'un seul utilisateur avec le req.params pour récupérer les données saisies dans l'URL
module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID inconnu : ' + err);
    }).select('-password');
};

// Méthode de mise à jour du champs d'un User
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const user = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            // (err, docs) => {
            //     if (!err) return res.send(docs);
            //     if (err) return res.status(500).json({message: err});
            // }
        )
        if (user) return res.status(200).json(user);
        else return res.status(404).send('User Non trouvé');
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Méthode de suppression d'un User
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Supprimé avec succès" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// méthode Follow des Users
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        // ajout à la liste des followers
        const followers = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            // (err, docs) => {
            //     if (!err) return res.status(201).json(docs);
            //     else return res.status(400).json(err);
            // }
        );
        // ajout à la liste des following
        const following = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            // (err, docs) => {
            //     if (err) return res.status(400).json(err);
            // }
        );

        if (followers && following) return res.status(201).json([followers, following]);
        else return res.status(404).json("ID followers not found");
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

// méthode arrêt Follow des Users
module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        // enlève à la liste des followers
        const unfollowers = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            // (err, docs) => {
            //     if (!err) return res.status(201).json(docs);
            //     else return res.status(400).json(err);
            // }
        );
        // enlève à la liste des following
        const unfollowing = await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            // (err, docs) => {
            //     if (err) return res.status(400).json(err);
            // }
        );

        if (unfollowers && unfollowing) return res.status(201).json([unfollowers, unfollowing]);
        else return res.status(404).json("ID followers not found");
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
