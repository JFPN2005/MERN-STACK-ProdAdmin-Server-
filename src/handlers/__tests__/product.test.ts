import request from 'supertest'
import server from '../../server'

// Testing del envio de peticion POST a la API de productos
describe('POST /api/products', () => {

    it("should display validations error", async () => {
        const response = await request(server).post('/api/products').send({})

        // Esperamos un error 400
        expect(response.status).toBe(400)
        // Esperamos que contenga un mensaje de "error"
        expect(response.body).toHaveProperty('errors')
        // Esperamos que tenga 4 errores
        expect(response.body.errors).toHaveLength(4)

        // Esperamos que no tenga un error 404
        expect(response.status).not.toBe(404)
        // Esperamos que no tenga 2 errores
        expect(response.body.errors).not.toHaveLength(2)
    })

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post('/api/products').send({})

        // Esperamos un error 400
        expect(response.status).toBe(400)
        // Esperamos que contenga un mensaje de "error"
        expect(response.body).toHaveProperty('errors')
        // Esperamos que tenga 4 errores
        expect(response.body.errors).toHaveLength(4)

        // Esperamos que no tenga un error 404
        expect(response.status).not.toBe(404)
        // Esperamos que no tenga 2 errores
        expect(response.body.errors).not.toHaveLength(2)
    })

    it("should create a new product", async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Testing",
            price: 55
        })

        // Esperamos que el estado de la respuesta sea tipos POST y se conecte correctamente
        expect(response.status).toEqual(201)
        // Esperamos que los datos tenga la propiedad "data"
        expect(response.body).toHaveProperty('data')

        // Esperamos que haya un error 404
        expect(response.status).not.toBe(404)
        // Esperemos el estado de la respuesta sea solo de tipo POST
        expect(response.status).not.toBe(200)
        // Esperamos que no contenga un mensaje de "error"
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Testing del envio de peticion GET a la API de productos
describe('GET /api/products', () => {

    // Verificamos que la URL exista
    it('should check if api/products url exists', async () => {
        // Recogemos los datos del servidor
        const response = await request(server).get('/api/products')
        // Esperamos que la respuesta no tenga un error 404
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async () => {
        // Recogemos los datos del servidor
        const response = await request(server).get('/api/products')
        
        // Esperamos que la respuesta sea correcta
        expect(response.status).toBe(200)
        // Esperamos que la respuesta sea de tipo JSON
        expect(response.headers['content-type']).toMatch(/json/)
        // Esperamos que la respuesta contenga datos
        expect(response.body).toHaveProperty('data')
        // Esperamos que la respuesta contenga a menos un dato
        expect(response.body.data).toHaveLength(1)

        // Esperamos que la respuesta no tenga errores
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Testing del envio de peticion GET a la API para un solo producto
describe('GET /api/products/:id', () => {
    it('Should return un 404 response for a not-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        // Test
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto no encontrado.")
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')

        // Test
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('Get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')

        // Test
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    // Esperamos que el ID de la URL sea valido
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        // Test
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })
    
    // Esperemos que no haya mensaje de errores
    it('Should display validation erro messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // Esperamos que si haya errores
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // Esperamos que el precio sea mayor a cero
    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 0
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // Esperamos que si haya errores
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El precio no puede ser menor a cero")


        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // Esperamos que el ID del producto exista
    it('Should return 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado.')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    
    // Esperamos que producto se actualice correctamente
    it('Should update an existing product with valid data', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    // Comprobamos que haya un error cuando no exista un producto
    it('Should return a 404 response for non-existing product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado.')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // Comprobamos que se actualice la disponibilidad
    it('Should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')

        // Testing
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')

    })
})

describe('DELETE /api/products/:id', () => {
    // Comprobamos que el ID se valido
    it('Should check valid Id', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        // Test
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })
    
    // Comprobamos errores
    it('Should return 404 message para non-existend product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
            
        // Test
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado.")

        expect(response.status).not.toBe(200)
    })

    // Comprobamos que se elimine correctamente
    it('Should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Producto Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})