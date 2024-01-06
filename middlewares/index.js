const  ValidaCampos  = require('../middlewares/ValidarCampos');
const  ValidaJWT  = require('../middlewares/ValidarJwt');
const ValidaRoles = require('../middlewares/ValidarRoles');

module.exports={
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidaRoles
}