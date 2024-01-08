const {response,request} = require('express');  
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request,res = response) => {
    
    const {limite = 5,desde = 0} = req.query;
    const query={estado:true}

    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuarioPost =async (req,res = response) => {
    
    const {nombre,correo,password,role}=req.body;
    const usuario=new Usuario({nombre,correo,password,role});


    //Encriptar la contrasena
    const salt=bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en BD
    await usuario.save();

    res.json(usuario)
}

const usuarioPut = async (req,res=response) => {
    const {id}=req.params;
    const {_id, password, google, correo,...resto}=req.body;

    //VALIDAR CON LA BASE DE DATOS  
    if(password){
        //Encriptar la contrasena
        const salt=bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);

    res.status(201).json(usuario)
}

const usuarioPath = (req,res) => {
    res.json({
        msg:'path API - Controlador'
    })
}

const usuarioDelete = async (req,res) => {
    const {id}=req.params;

    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({usuario});
}

module.exports={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete
}