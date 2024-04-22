const Juego = require("../models/juegos");


const getJuegos = async (req,res,next) => {
    try {
        const juegos = await Juego.find();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(400).json("error en el get");
    }
};

const getJuegoById = async (req,res,next) => {
    try {
        const { id } = req.params;
        const juego = await Juego.findById(id);
        return res.status(200).json(juego);
    } catch (error) {
        return res.status(400).json("error en el getById");
    }
};

const getJuegosByPrice = async (req,res,next) => {
    try {
        const { precio } = req.params;
        const juegos = await Juego.find({ precio: { $lte:precio}});
        return res.status(200).json(juegos);
    } catch (error) {
        return res.status(400).json("error en el getByPrice");
    }
};

const createJuego = async (req,res,next) => {
    try {
        const { nombre } = req.body;
        const juegoExistente = await Juego.findOne({ nombre });
        if (juegoExistente) {
            return res.status(400).json("Ya existe un juego con este nombre");
        }
        const nuevoJuego = new Juego(req.body);
        const juegoSaved = await nuevoJuego.save();
        return res.status(201).json(juegoSaved);
    } catch (error) {
        return res.status(400).json("error en el createJuego");
    }
};

const changeJuego = async (req,res,next) => {
    try {
        const { id } = req.params;
        const newJuego = new Juego(req.body);
        newJuego._id = id;
        const juegoUpdated = await Juego.findByIdAndUpdate(id, newJuego, {
            new:true,
        });
        return res.status(200).json(juegoUpdated);
    } catch (error) {
        return res.status(400).json("error en el get")
    }
};

const deleteJuego = async (req,res,next) => {
    try {
        const { id } = req.params;
        const juegoDeleted = await Juego.findByIdAndDelete(id);
        return res.status(200).json({ mensaje:"Juego Eliminado", juegoDeleted });
    } catch (error) {
        return res.status(400).json("error en el get");
    }
};


module.exports = { getJuegos,getJuegoById,getJuegosByPrice,createJuego,changeJuego,deleteJuego };