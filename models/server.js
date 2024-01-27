const express= require('express')
const cors= require('cors');
const fileupload=require('express-fileupload')
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar:'/api/buscar',
            users: '/api/users',
            productos:'/api/productos',
            categorias: '/api/categorias',
            uploads:'/api/uploads'
        }

        //Conectar a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares=this.middlewares();
        
        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lecura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Manejar la carga de archivos
        this.app.use(fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.paths.auth,require(       '../routes/auth'));
        this.app.use(this.paths.buscar,require(     '../routes/buscar'));
        this.app.use(this.paths.categorias,require( '../routes/categorias'));
        this.app.use(this.paths.productos,require(  '../routes/producto'));
        this.app.use(this.paths.users,require(      '../routes/user'));
        this.app.use(this.paths.uploads,require(    '../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports=Server;