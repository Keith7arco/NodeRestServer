const path = require("path");
const fs= require("fs");

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers/subirArchivo");
const {Usuario,Producto}= require('../models');

const cargarArchivos=async(req,res=response)=>{

  try {
    const pathCompleto = await subirArchivo(req.files,undefined,'imgs');
    res.json({nombre:pathCompleto})
  } catch (msg) {
    res.status(400).json({msg})
  }

}

const actualizarImg=async(req,res=response)=>{

  const {id,collection}=req.params;

  let modelo;

  switch (collection) {
    case 'usuarios':
      modelo=await Usuario.findById(id);
      if( !modelo ){
        return res.status(400).json({
          msg:`No existe el usuario con el id ${id}`
        })
      }
    break;
    case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe el producto con el id ${id}`
        })
      }
    break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto...'});
  }
  // Limpiar imgs previas
  if(modelo.img){
    const pathImg = path.join(__dirname,'../uploads',collection,modelo.img);
    if(fs.existsSync(pathImg)){
      fs.unlinkSync(pathImg);
    }
  }

  const nombre=await subirArchivo(req.files,undefined,collection);
  modelo.img=nombre;

  await modelo.save();

  res.json(modelo);
}

const actualizarImgCloudinary=async(req,res=response)=>{

  const {id,collection}=req.params;

  let modelo;

  switch (collection) {
    case 'usuarios':
      modelo=await Usuario.findById(id);
      if( !modelo ){
        return res.status(400).json({
          msg:`No existe el usuario con el id ${id}`
        })
      }
    break;
    case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe el producto con el id ${id}`
        })
      }
    break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto...'});
  }
  // Limpiar imgs previas
  if(modelo.img){
    const nombreArr=modelo.img.split('/');
    const nombre=nombreArr[nombreArr.length -1];
    const [public_id]=nombre.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath}=req.files.archivo
  const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

  modelo.img=secure_url;

  await modelo.save();

  res.json(modelo);
}


const mostrarImg=async(req,res=response)=>{

  const {id,collection}=req.params;

  let modelo;

  switch (collection) {
    case 'usuarios':
      modelo=await Usuario.findById(id);
      if( !modelo ){
        return res.status(400).json({
          msg:`No existe el usuario con el id ${id}`
        })
      }
    break;
    case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`No existe el producto con el id ${id}`
        })
      }
    break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto...'});
  }
  // Limpiar imgs previas
  if(modelo.img){
    const pathImg = path.join(__dirname,'../uploads',collection,modelo.img);
    if(fs.existsSync(pathImg)){
      return res.sendFile(pathImg)
    }
  }
  const pathImg = path.join(__dirname,'../assets/no-image.jpg');
  res.sendFile(pathImg)
}

module.exports={
  cargarArchivos,
  actualizarImg,
  mostrarImg,
  actualizarImgCloudinary
};