import { Router } from "express"
import {body, param} from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateavailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

// Ingresamos al Router
const router = Router()


/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product Id
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      example: Computer
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags: 
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:        
 *              description: Bad Request - Invalid ID
 */
router.get('/', getProducts)
router.get('/:id', 
    // Comprobamos que el ID sea un numero entero
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Product create successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input data
 */

// Crear productos
router.post('/', 
    // NOMBRE
    body('name')
        // Verificamos que el nombre no este vacio
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),
    // PRECIO
    body('price')
        // Verificamos que el precio sea un numero
        .isNumeric().withMessage("El precio debe ser un numero")
        // Verificamos que no este vacio
        .notEmpty().withMessage("El precio del Producto no puede ir vacio")
        // Verificamos que sea mayo a 0
        .custom(value => value > 0).withMessage("El precio no puede ser menor a cero"),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:                 
 *                  application/json:     
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid Id or Invalid input data
 *          404:
 *              description: Product Not Found
 */

// Editar Productos
router.put('/:id', 
    // Comprobamos que el ID sea un numero entero
    param('id').isInt().withMessage("ID no valido"),

    // NOMBRE
    body('name')
        // Verificamos que el nombre no este vacio
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),
    // PRECIO
    body('price')
        // Verificamos que el precio sea un numero
        .isNumeric().withMessage("El precio debe ser un numero")
        // Verificamos que no este vacio
        .notEmpty().withMessage("El precio del Producto no puede ir vacio")
        // Verificamos que sea mayo a 0
        .custom(value => value > 0).withMessage("El precio no puede ser menor a cero"),
    body('availability')
        .isBoolean().withMessage("La disponibilidad debe ser un Booleano"),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Products Availability
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:                 
 *                  application/json:     
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid Id
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id', 
    // Comprobamos que el ID sea un numero entero
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateavailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a Product
 *      tags:
 *          - Products
 *      description: Returns a confirmation messages
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:                 
 *                  application/json:     
 *                      schema:
 *                          type: string
 *                          value: 'Product Remove'
 *          400:
 *              description: Bad Request - Invalid Id
 *          404:
 *              description: Product Not Found

 */

router.delete('/:id',
    // Comprobamos que el ID sea un numero entero
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct)

// Exportamos el Router
export default router