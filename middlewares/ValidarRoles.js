const { response } = require("express");
const { model } = require("mongoose");

const AdminRol = (req,res= response,next) => {
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin valdar el token primero'
        })
    }

    const {rol,nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El nombre ${nombre} no es admin, no puede hacer esto.`
        })
    }
    
    next();
}

const tieneRol = ( ...roles ) =>{
    return (req,res= response,next)=>{
        
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}.`
            })
        }
        next();
    }
}


module.exports = {
    AdminRol,
    tieneRol
}