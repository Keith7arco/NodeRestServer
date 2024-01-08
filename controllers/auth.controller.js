const {response} =require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res =response) =>{

    const {correo, password}=req.body;
    
    try {

        //Verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        //Verificar usuario activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            })
        }
        //Verificar contrasena
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            msg:'Login OK',
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el dev...',
        })
    }
}

const googleSignIn = async(req,res=response)=>{

    const {id_token} = req.body;

    try {
        const {nombre,img,correo}= await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        
        if(!usuario){
            const data = {
                nombre,
                correo,
                password:'XD',
                img,
                role: "USER_ROLE",
                google:true
            };

            usuario = new Usuario( data );
            await usuario.save();
            
        }

        //Si el usuario esta bloqueado en la bd 
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el admin, usuario bloqueado'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            msg:'Todo OK - Google Sing-IN',
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El Token no se pudo verificar'
        })
    }   

    
}

module.exports = {
    login,
    googleSignIn
};