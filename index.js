const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()

let allUsers = [
    {
        name: "Elijah",
        age: 35,
        ID: 1,
        adress: "5 Johnson Adebiyi Street, Omolayo Bus Stop, Egbeda, Lagos"
    },
    {
        name: "Promise",
        age: 30,
        ID: 2,
        adress: "7 Johnson Adebiyi Street, Omolayo Bus Stop, Egbeda, Lagos"
    },
    {
        name: "David",
        age: 20,
        ID: 3,
        adress: "9 Johnson Adebiyi Street, Omolayo Bus Stop, Egbeda, Lagos"
    }
]
app.get("/all-users", (req, res)=>{
    res.status(200).json(allUsers)
})

app.get("/user", function(req, res) {
    allUsers.find(function(user) {
        if (user.ID == 1) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found, please try again.")
        }
    })
})
app.post("/add-user", function(req, res) {
    allUsers.push({
        name: "David",
        age: 24,
        ID: 3,
        adress: "12 Johnson Adebiyi Street, Omolayo Bus Stop, Egbeda, Lagos"
    })
    res.status(200).json(allUsers)
})
app.put("/update-user", function(req, res) {

})
app.delete("/delete-user", function(req, res) {
    
})
app.listen(3000, ()=>{
    console.log("running")
})