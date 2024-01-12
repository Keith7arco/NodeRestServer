const {Schema,model}=require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:[true,'El usuario es obligatorio']
    },
}); 


CategoriaSchema.methods.toJSON = function(){
    //Quitar los datos no queridos
    const{ __v,estado,...data }=this.toObject();
    return data;
}

module.exports= model('Categoria',CategoriaSchema);