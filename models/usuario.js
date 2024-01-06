
const {Schema,model}=require('mongoose');

const UsuarioSchema= Schema({
    nombre: {
        type:String,
        required:[true,'El nombre es Obligatorio']
    },
    correo: {
        type:String,
        required:[true,'El correo es Obligatorio'],
        unique:true
    },
    password: {
        type:String,
        required:[true,'La password es Obligatoria']
    },
    img: {
        type:String
    },
    role: {
        type:String,
        required:true
    },
    estado: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function(){
    const{ __v,password,_id,...user }=this.toObject();
    user.uid = _id;
    return user;
}

//Mongo se encarga de ponerle la 's'
module.exports = model( 'Usuario', UsuarioSchema);