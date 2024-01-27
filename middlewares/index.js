const  ValidaCampos  = require('../middlewares/ValidarCampos');
const  ValidaJWT  = require('../middlewares/ValidarJwt');
const ValidaRoles = require('../middlewares/ValidarRoles');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports={
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidaRoles,
    ...validarArchivo
}