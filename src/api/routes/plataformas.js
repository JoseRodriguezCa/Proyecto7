const { isAdmin, isUser } = require("../../middlewares/auth");
const { getPlataformas, getPlataformaById, getPlataformasByPrecio, createPlataforma, changePlataforma, deletePlataforma } = require("../controllers/plataformas");


const plataformasRouter = require("express").Router();

plataformasRouter.get("/ByPrecio/:precio",[isUser],getPlataformasByPrecio);
plataformasRouter.get("/:id",[isUser], getPlataformaById);
plataformasRouter.get("/",[isUser],  getPlataformas);
plataformasRouter.post("/",[isAdmin], createPlataforma);
plataformasRouter.put("/:id",[isAdmin], changePlataforma);
plataformasRouter.delete("/:id",[isAdmin], deletePlataforma);


module.exports = plataformasRouter;