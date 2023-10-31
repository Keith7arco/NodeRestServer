const {Router}= require('express');

const {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete }= require('../controllers/user.controller');
const router = Router();

router.get('/',usuariosGet);

router.post('/',usuarioPost);

router.put('/:id',usuarioPut);

router.patch('/',usuarioPath);

router.delete('/',usuarioDelete);


module.exports = router;