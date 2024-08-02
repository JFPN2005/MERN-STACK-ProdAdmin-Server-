import server from "./server";
import colors from 'colors'

// Llamamos el servidor de Express y le asignamos un puerto
const port = process.env.PORT || 4000

server.listen(4000, () => {
    console.log(colors.cyan.bold(`Servidor corriendo en el puerto ${port}`));
})