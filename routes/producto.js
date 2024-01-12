const {Router}= require('express');
const { check } = require('express-validator');

const {
    ObtenerProductos,
    CrearProducto, 
    ObtenerProducto,
    ActualizarProducto,
    BorrarProducto
} = require('../controllers/producto.controller');

const { ValidarJWT, validarCampos, AdminRol } = require('../middlewares');
const { existProductoxId, existProducto, existCategoriaxId } = require('../helpers/dbValidators');

const router = Router();

//Obtener todas los productos - publico
router.get('/',ObtenerProductos)
//Obtener todas los productos - publico
router.get('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existProductoxId),
    validarCampos
],ObtenerProducto)
//Crear un nuevo producto - privado - cualquiera con token valido
router.post('/',[
    ValidarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id Valido').isMongoId(),
    check('categoria').custom(existCategoriaxId),
    validarCampos
],CrearProducto)

router.put('/:id',[
    ValidarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existProductoxId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existProducto),
    //check('categoria','No es un id Valido').isMongoId(),
    //check('categoria').custom(existCategoriaxId),
    validarCampos
],ActualizarProducto)

router.delete('/:id',[
    ValidarJWT,
    AdminRol,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existProductoxId),
    validarCampos
],BorrarProducto)

module.exports = router;