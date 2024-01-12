const {Router}= require('express');
const { check } = require('express-validator');

const { ValidarJWT, validarCampos, AdminRol } = require('../middlewares');
const { 
    ObtenerCategorias,
    CrearCategoria, 
    ObtenerCategoria,
    ActualizarCategoria,
    BorrarCategoria
} = require('../controllers/categoria.controller');

const { existCategoriaxId, existCategoria } = require('../helpers/dbValidators');

const router = Router();


//Obtener todas las categorias - publico
router.get('/',ObtenerCategorias)

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existCategoriaxId),
    validarCampos
],ObtenerCategoria)

//Crear una nueva categoria - privado - cualquiera con token valido
router.post('/',[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existCategoria),
    validarCampos
],CrearCategoria)

//Actualizar una categoria - privado - cualquiera con token valido
router.put('/:id',[
    ValidarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existCategoriaxId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existCategoria),
    validarCampos
],ActualizarCategoria)

//Borrar una categoria - privado - admin
router.delete('/:id',[
    ValidarJWT,
    AdminRol,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existCategoriaxId),
    validarCampos
],BorrarCategoria)

module.exports = router;