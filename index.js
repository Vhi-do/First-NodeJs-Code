const express = require("express")
const app = express()
const users = require("./controller/users")
const upload = require("./config")
//const authorization = require("./middleware/authorization")

app.use(express.json());
const { userAuthorization } = require("./middleware/authorization");
app.put("/update-user/:id", upload.single("avatar"), users.updateUser);
app.get("/users", users.getAllUsers);
app.get("/user", userAuthorization, users.getUser);
app.delete("/delete-user/:id", users.deleteUser);
app.post("/signup", users.createUser);
app.post("/user/login", users.signIn);
app.post("/profile", userAuthorization, users.getProfile)
app.patch("/profile", userAuthorization, users.updateProfile)

var port = (3000);
app.listen(port, () => console.log(`listening on port ${port}`));