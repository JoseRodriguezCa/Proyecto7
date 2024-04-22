const User = require("../api/models/users");
const { verifyJwt } = require("../utils/jwt");



const isUser = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        
        if(!token) {
            return res.status(400).json("No estas autorizado");
        }
        const cleanToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(cleanToken);
        const user = await User.findById(id);
        if(user.rol.includes("usuario")){
            user.contraseña = null;
            req.user = user;
            next();
        };
    } catch (error) {
        return res.status(400).json("No estas autorizado");
    }
}

const isAdmin = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        
        if(!token) {
            return res.status(400).json("No estas autorizado");
        }
        const cleanToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(cleanToken);
        const user = await User.findById(id);
        if(user.rol.includes("admin")){
            user.contraseña = null;
            req.user = user;
            next();
        }else {
            return res.status(400).json("No estas autorizado");
        };
    } catch (error) {
        return res.status(400).json("No estas autorizado");
    }
}



module.exports = {isUser,isAdmin}