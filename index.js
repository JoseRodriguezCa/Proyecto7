require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const juegosRouter = require("./src/api/routes/juegos");
const plataformasRouter = require("./src/api/routes/plataformas");
const usersRouter = require("./src/api/routes/users");


app = express();

app.use(express.json());

connectDB();
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/plataformas", plataformasRouter);
app.use("/api/v1/juegos", juegosRouter);

app.use("*", (req,res,next) => {
    res.status(400).json("route not found")
});




app.listen(3000, () => {
    console.log("servidor escuchando en http://localhost:3000");
});