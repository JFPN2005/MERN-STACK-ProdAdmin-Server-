import {exit} from 'node:process'
import db from '../config/db'

// Funcion que limpia la BD
const clearDB = async () => {
    try {
        // Eliminamos datos de BD
        await db.sync({force: true})
        console.log("Datos eliminados")
        // Aseguramos que el programa termine correctamente
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

// Si existe el argumento "--clear" en el package.json llamamos la funcion "clearDB"
if(process.argv[2] === '--clear') {
    clearDB()
}