const { isAdmin, isUser } = require("../../middlewares/auth");
const { getJuegos, getJuegoById, getJuegosByPrice, createJuego, changeJuego, deleteJuego } = require("../controllers/juegos");



const juegosRouter = require("express").Router();

juegosRouter.get("/:id",[isUser], getJuegoById);
juegosRouter.get("/ByPrecio/:precio",[isUser], getJuegosByPrice);
juegosRouter.get("/",[isUser], getJuegos);
juegosRouter.post("/",[isAdmin], createJuego);
juegosRouter.put("/:id",[isAdmin], changeJuego);
juegosRouter.delete("/:id",[isAdmin], deleteJuego);

module.exports = juegosRouter;