const { Usuario,Categoria, Producto } = require('../models');
const Role = require('../models/rol');

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
        throw new Error(`El id del usuaro no existe: ${id} .`)
    }
})

const existCategoriaxId = async (id='')=>{
    const existCategoria= await Categoria.findById(id);
    if(!existCategoria){
        throw new Error(`El id de esta categoria no existe: ${id} .`)
    }
}

const existCategoria = (async (nombre='')=>{
    //Verificar si el nombre existe
    const existNombre= await Categoria.findOne({ nombre });
    if(existNombre){
        throw new Error(`El nombre ${nombre} ya esta registrado en la BD.`)
    }
})

const existProductoxId = async (id='')=>{
    const existProducto= await Producto.findById(id);
    if(!existProducto){
        throw new Error(`El id de este producto no existe: ${id} .`)
    }
}

const existProducto = (async (nombre='')=>{
    //Verificar si el nombre existe
    const existNombre= await Producto.findOne({ nombre });
    if(existNombre){
        throw new Error(`El poducto ${nombre} ya esta registrado en la BD.`)
    }
})

//Validar Coleciones permitidas
const coleccionesPermitidas = (collection='',colletions=[])=>{
    const incluida = colletions.includes(collection);
    if(!incluida){
        throw new Error(`La coleccion: ${collection} no esta permitida - ${colletions}`)
    }
    return true;
}

module.exports= {
    esRolValido,
    existEmail,
    existUserxId,
    existCategoriaxId,
    existCategoria,
    existProductoxId,
    existProducto,
    coleccionesPermitidas
}