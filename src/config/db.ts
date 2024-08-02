import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Ingresamos a las variables de entorno
dotenv.config();

// Creamos nuestra base de datos en Postgresql y enlazamos con Sequilize
const db = new Sequelize(process.env.DATABASE_URL, {
    // Accedemos a todos los modelos de la BD
    models: [__dirname + '/../models/**/*'],
    logging: false
})

// Exportamos nuestra base de datos 
export default db