const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = (async (rol='')=>{

    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD.`)
    }
})

const existEmail = (async (correo='')=>{
    //Verificar si el correo existe
    const exitEmail= await Usuario.findOne({ correo });
    if(exitEmail){
        throw new Error(`El correo ${correo} ya esta registrado en la BD.`)
    }
})

const existUserxId = (async (id='')=>{
    //Verificar si el correo existe
    const exitUser= await Usuario.findById(id);
    if(!exitUser){
        throw new Error(`El id no existe: ${id} .`)
    }
})

module.exports= {
    esRolValido,
    existEmail,
    existUserxId
}