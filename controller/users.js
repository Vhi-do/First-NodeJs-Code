const { userDatabase } = require("../model/database");
const db = userDatabase;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const fs = require("fs");
path = require("path");
const uuid = require("uuid");



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
exports.createUser = async function (req, res) {
    const objectSchema = Joi.object.keys({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments : 2 }).required(),
        password: Joi.string().min(8).required(),
        repeat_password: Joi.ref("password")
    });

    let { fullName, email, password, repeat_password} = req.body;
    console.log(password)

    try{
        const data = await objectSchema.validateAsync(req.body);
        let {fullName, email, password} = data;
        password = bcrypt.hashSync(password, 10);
        console.log(password)
        console.log("Vhido")
        const user = {}
    }   catch (err) {
        console.log(err.message)
    };
};