const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()
const users = require("./controller/users")
const upload = require("./config")

app.use(express.json());

app.put("/update-user/:id", upload.single("avatar"), users.updateUser);
app.get("/users", users.getAllUsers);
app.get("/user/:id", users.getUser);
app.post("/add-user", users.createUser);
app.delete("/delete-user/:id", users.deleteUser);

var port = (3000);
app.listen(port, ()=> console.log(`listening on port ${port}`));