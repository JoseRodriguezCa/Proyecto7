const Plataforma = require("../models/plataformas");


const getPlataformas = async (req,res,next) => {
    try {
        const plataformas = await Plataforma.find().populate("juegos");
        return res.status(200).json(plataformas);
    } catch (error) {
        return res.status(400).json("error en get");
    }
};

const getPlataformaById = async (req,res,next) => {
    try {
        const { id } = req.params
        const plataforma = await Plataforma.findById(id).populate("juegos");
        return res.status(200).json(plataforma);
    } catch (error) {
        return res.status(400).json("error en getById");
    }
};

const getPlataformasByPrecio = async (req,res,next) => {
    try {
        const { precio } = req.params
        const plataformas = await Plataforma.find({precio: {$lte: precio}}).populate("juegos");
        return res.status(200).json(plataformas);
    } catch (error) {
        return res.status(400).json("error en getByPrecio");
    }
};

const createPlataforma = async (req,res,next) => {
    try {
        const { nombre } = req.body;
        const plataformaExiste = await Plataforma.findOne({nombre});
        if(plataformaExiste){
            return res.status(400).json("Ya existe una plataforma con este nombre");
        }
        const newPlataforma = new Plataforma(req.body);
        const plataformaSaved = await newPlataforma.save();
        return res.status(201).json(plataformaSaved);
    } catch (error) {
        return res.status(400).json("error en createPlataforma");
    }
};

const changePlataforma = async (req,res,next) => {
    try {
        const { id } = req.params;
        const oldPlataforma = await Plataforma.findById(id);
        const newPlataforma = new Plataforma(req.body);

        newPlataforma._id = id;
        newPlataforma.juegos = [...oldPlataforma.juegos, ...req.body.juegos];
        const plataformaUpdated = await Plataforma.findByIdAndUpdate(id,newPlataforma,{
            new:true
        });
        return res.status(200).json(plataformaUpdated);
    } catch (error) {
        return res.status(400).json("Error en changePlataforma")
    }
};

const deletePlataforma = async (req,res,next) => {
    const { id }  = req.params;
    const deletedPlataforma = await Plataforma.findByIdAndDelete(id)
    return res.status(200).json({Mensaje:"Plataforma eliminada", deletedPlataforma})
};

module.exports = {getPlataformas,getPlataformaById,getPlataformasByPrecio,createPlataforma,changePlataforma,deletePlataforma};