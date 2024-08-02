import { connectDB } from "../server";
import db from "../config/db";

// Accedemos a la conexion a la BD con "mock" para simular
jest.mock('../config/db')

// Simulamos la conexion a la BD
describe('connectDB', () => {
    // Esperemos que haya un error en la conexion a BD
    it('Should handle database connection error', async () => {
        // Espiamos el metodo de autenticacion del objeto "db"
        jest.spyOn(db, 'authenticate')
            // Cancelamos la conexion a la BD para dirigirno al error
            .mockRejectedValueOnce(new Error('Hubo un Error con la conexion a la BD'))
        // Espiamos el "log" de la consola
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()

        // Esperamos que "consoleSpy" contenga un string
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un Error con la conexion a la BD')
        )
    })
})