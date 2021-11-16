const { userDatabase, profileDatabase } = require("../model/database");
const db = userDatabase;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
path = require("path");
const uuid = require("uuid");
const { log } = require("console");



//update existing user
exports.updateUser = function(req, res) {
    const id = req.params.id;
    const user = allUsers.find(user => {
        if (user.id === Number(id)) {
            return user
        } else {
            false
        }
    });

    console.log(req.file)

    if (!user) {
        return res.status(404).send("User not found")
    }
    user.name = req.body.name,
        user.age = req.body.age,
        user.address = req.body.adress,
        user.photo = req.file.path
    res.send(user);
}

//delete user
exports.deleteUser = function(req, res) {
    const id = req.params.id;
    const user = allUsers.find(user => {
        if (user.id === Number(id)) {
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
exports.getAllUsers = function(req, res) {
    if (allUsers.length > 0) {
        res.status(200).json(allUsers)
    } else {
        res.status(404).send("No user at the moment")
    }
}

// Get a single user using it's id
exports.getUser = function(req, res) {
    const { id } = req.user;
    log(id)
    const user = db.find(user => {
        if (user.id === id) {
            return user
        } else {
            return false
        }
    });
    if (user) {
        delete user.password;
        res.status(200).send(user);
    } else {
        res.status(404).send("User not found");
    }
};

// Create a user and validate input
exports.createUser = async function(req, res) {

    const objectSchema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).required(),
        Cpassword: Joi.ref("password")
    });

    try {

        const data = await objectSchema.validate(req.body);

        let { fullName, email, password } = data;
        password = bcrypt.hashSync(password, 10);
        console.log(password);
        const user = {
            id: uuid.v4(),
            fullName,
            email,
            status: "pending",
            password,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const profile = {id: uuid(), fullName, email, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()};
        profileDatabase.push(profile);
        db.push(user);
        res.json({ okay: true, message: "User created successfully" })

    } catch (err) {
        console.log(err)
        res.status(422).json({ okay: false, message: err.details[0].message })
    };
};

exports.signIn = async(req, res) => {
    const object = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
    });

    try {
        const data = await object.validate(req.body);
        // const users = user => log(user);
        // db.forEach(users);
        const { email, password } = data;
        db.find(user => {
            if (user.email == email) {
                const isPassword = bcrypt.compareSync(password, user.password);
                if (isPassword) {
                    const token = jwt.sign({ id: user.id, email: user.email }, "my_secret", { expiresIn: "2d" });
                    res.status(200).json({ okay: true, token: `Bearer ${token}`, message: "Logged in successfully" })
                } else {
                    res.status(404).json({ okay: false, message: "Incorrect Password" })
                }
            } else res.status(404).json({ okay: false, message: " User not found" })
        })
    } catch (err) {
        if (err.details) res.status(422).json({ okay: false, message: err.details[0].message })
        else res.status(422).json({ okay: false, message: err.message })
    }
}

exports.getProfile = async(req,res) => {
    const token = req.headers.authorization
    console.log(token)
}