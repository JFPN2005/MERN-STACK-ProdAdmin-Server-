// Creamos y exportamos el servidor de Express
import Express from 'express'
import router from './router'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
import db from './config/db'
import colors from 'colors'

// Instancia de Express
const server = Express()

// Permitir conexiones externas
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        // Verificamos que la conexion este permitida
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error("Error de Cors"))
        }
    }
}
// Conectamos nuetro servidor
server.use(cors(corsOptions))

// Conectamos nuestra BD
export async function connectDB() {
    // Verificamos que se conecte correctamente
    try {
        // Autenticamos
        await db.authenticate()
        // Sincronizamos
        db.sync()
        // console.log(colors.magenta.bold("Conexion exitosa"))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold( "Hubo un Error con la conexion a la BD"))
    }
}
// Conectar
connectDB()

// Leer datos de formularios
server.use(Express.json())

// Ver informacion acerca de la consulta
server.use(morgan('dev'))

// Utilizamos cada Request del del Router
server.use('/api/products', router)

// Documentacion de la API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server