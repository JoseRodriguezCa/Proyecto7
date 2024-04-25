const { generateSign } = require("../../utils/jwt");
const User = require("../models/users")
const bcrypt = require("bcrypt");


const getUsers = async (req,res,next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("error en getUsers");
    }
};

const getUserById = async (req,res,next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("error en getUserById");
    }
};

const loginUser = async (req,res,next ) => {
    try {
        const user = await User.findOne({nombreUsuario: req.body.nombreUsuario});
        console.log(user);
        if(user) {
            if(bcrypt.compareSync(req.body.contraseña, user.contraseña)){
                const token = generateSign(user._id);
                console.log(token);
                return res.status(200).json({user,token});
            }else {
                return res.status(400).json("El usuario o la contraseña son incorrectos");
            }
        }else {
            return res.status(400).json("El usuario o la contraseña son incorrectos");
        }
    } catch (error) {
        
    }
};

const createUser = async (req,res,next) => {
    try {
        const newUser = new User(req.body);
        const userSaved = await newUser.save();
        console.log(userSaved);
        return res.status(201).json(userSaved);
    } catch (error) {
        return res.status(400).json("error en createUser");
    }
};

const changeUser = async (req,res,next) => {
    try {
        const { id } = req.params;
        const newUser = new User(req.body);
        const oldUser = await User.findById(id);
        newUser._id = id;
        if(oldUser.rol.includes(req.body.rol)){
            return res.status(400).json("ya tienes este rol")
        }
        if (newUser.contraseña) {
            const hashedPassword = bcrypt.hashSync(newUser.contraseña, 10);
            newUser.contraseña = hashedPassword;
        }
        if(!oldUser.rol.includes(newUser.rol)){
            newUser.rol = [...oldUser.rol, ...newUser.rol];
        }
        const userUpdated = await User.findByIdAndUpdate(id,newUser,{
            new:true
        });
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json("error en changeUser");
    }
};

const deleteUser = async (req,res,next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({mensaje:"Usuario Eliminado",user});
    } catch (error) {
        return res.status(400).json("error en deleteUser");
    }
};



module.exports = { getUsers,getUserById,createUser,changeUser,deleteUser,loginUser }