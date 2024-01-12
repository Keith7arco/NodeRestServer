const express= require('express')
const cors= require('cors');
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
            categorias: '/api/categorias'
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
    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/producto'));
        this.app.use(this.paths.users,require('../routes/user'));
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports=Server;