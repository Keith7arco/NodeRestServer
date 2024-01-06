const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const ValidarJWT=async(req = request,res = response,next)=>{
    
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion...'
        })
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)

        //Leer usuario
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Usuario inexistente en BD.'
            }) 
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no Valido - Usuario con estado eliminado'
            })
        }

        req.usuario = usuario;  
        next();
    } catch (error) {
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    
}

module.exports = {
    ValidarJWT
}