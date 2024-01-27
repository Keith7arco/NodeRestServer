const path=require('path')
const {v4:uuidv4}=require('uuid');

const subirArchivo=(files,extencionesPermitidas=['png','jpg','jpeg','gif'],carpeta='')=>{

    return new Promise((resolve, reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];

        //Validar extension
        if(!extencionesPermitidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida - ${extencionesPermitidas}`);
        }

        const nombretemp=uuidv4()+'.'+extension;
        const uploadPath = path.join(__dirname, '../uploads/' , carpeta,nombretemp);

        archivo.mv(uploadPath, (err) =>{
            if (err) {
                reject(err);
            }

            resolve(nombretemp);
        });
    })
}

module.exports={
    subirArchivo
}