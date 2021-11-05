const db = require("../model/database")

exports.processForm = (req, res) => {
    const {name, email, password} = req.body;
    
    if (!name || !email || !password) {
        res.render ("contact", {
            errrorMessage: "All fields are required",
            name: name,
            email: email,
            password: password
        })
    }
};