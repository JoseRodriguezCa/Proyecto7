const { isAdmin, isUser } = require("../../middlewares/auth");
const { getUsers, getUserById, createUser, changeUser, deleteUser, loginUser } = require("../controllers/users");


const usersRouter = require("express").Router();

usersRouter.get("/:id",[isAdmin], getUserById);
usersRouter.get("/",[isAdmin],  getUsers);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);
usersRouter.put("/:id",[isAdmin], changeUser);
usersRouter.delete("/:id",[isAdmin] ,deleteUser);


module.exports = usersRouter;