const dbValidators =require('./dbValidators');
const generarJWT   =require('./generarJWT');
const googleVerify =require('./google-verify');
const subirArchivo =require('./subirArchivo');

module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}