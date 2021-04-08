import express,{Application, } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import {sequelize} from './models'

require('dotenv').config();

//import ProductRoutes from './api/routes/productRoutes'
//import CategoryRoutes from './api/routes/categoryRoutes'

export default class App{
    app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.middlewares();
        this.routes();
    }

    config(){
        this.app.set('port', process.env.PORT || 5000);
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
          res.header('Access-Control-Allow-Origin', 'http://localhost:5000'); // update to match the domain you will make the request from
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
          next();
        });
        
    }

    routes(){
//        this.app.use('/products', ProductRoutes )
//        this.app.use('/categories', CategoryRoutes )
    }


    listen(){

        sequelize.sync({force:true})
        .then(() => {
            console.log('conectado a la base de datos')
            this.app.listen(this.app.get('port'),() => {
                console.log(`server o port ${this.app.get('port')}`);
            })   
        })


    }



}