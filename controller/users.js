const allUsers = require("../model/database");
const Joi = require("joi");

// Get all users
exports.getAllUsers = function (req, res) {
    if (allUsers.length > 0){
        res.status(200).json(allUsers)
    } else {
        res.status(404).send("No user at the moment")
    }
}

// Get a single user using it's id
 exports.getUser = function (req, res) {
    const id = req.params.id;
    const user = allUsers.find(user => {
        if(user.id===Number(id)) {
            return user
        } else {
            return false
        }
    });
    if(user) {
        res.status(200).send(user);
    } else {
        res.status(404).send("User not found")
    }
};

// Create a user and validate input
exports.createUser = function (req, res) {
    const schema = {
        name: Joi.string().min(3).required(),
        adress: Joi.string().min(10).required(),
        age: Joi.number().integer().min(18).max(100).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }

    const newUser = {
        id: allUsers.length + 1,
        name: req.body.name,
        age: req.body.age,
        address: req.body.adress
    };
    allUsers.push(newUser);
    res.send(newUser);
    console.log(req.body)
};

//update existing user
exports.updateUser = function (req, res) {
    const id = req.params.id;
    const user = allUsers.find(user => {
        if(user.id===Number(id)) {
            return user
        } else {
            false
        }
    });

    console.log(req.file)

    if(!user) {
    return res.status(404).send("User not found")
    }
    user.name = req.body.name,
    user.age = req.body.age,
    user.address = req.body.adress,
    user.photo = req.file.path
    res.send(user);
}

//delete user
exports.deleteUser = function (req, res) {
    const id = req.params.id;
    const user = allUsers.find(user => {
        if(user.id===Number(id)) {
            return user
        } else {
            false
        }
    });

    if (user) {
        const index = allUsers.indexOf(user);
        allUsers.splice(index, 1);
        res.send(user);
    } else {
        res.status(404).send("No user with the given id")
    };
};