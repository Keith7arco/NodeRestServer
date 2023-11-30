const {Router}= require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/ValidarCampos');
const { esRolValido,
        existEmail,
        existUserxId} = require('../helpers/dbValidators');

const {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete }= require('../controllers/user.controller');
const router = Router();

router.get('/',usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password tener mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( existEmail ),  
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( esRolValido ),
    validarCampos
],usuarioPost);

router.put('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existUserxId),
    check('role').custom( esRolValido ),
    validarCampos
],usuarioPut);

router.patch('/',usuarioPath);

router.delete('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existUserxId),
    validarCampos
],usuarioDelete);


module.exports = router;