const {Router}= require('express');
const { check } = require('express-validator');
const { validarCampos,validarArchivosSubir } = require('../middlewares');
const { cargarArchivos, actualizarImg, mostrarImg, actualizarImgCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/dbValidators');

const router = Router();

router.post('/',validarArchivosSubir,cargarArchivos);

router.put('/:collection/:id',[
    check('id','El id debe ser un mongoID').isMongoId(),
    check('collection').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImgCloudinary);

router.get('/:collection/:id',[
    check('id','El id debe ser un mongoID').isMongoId(),
    check('collection').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImg)

module.exports = router;