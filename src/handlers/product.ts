import { Request, Response } from "express"
import Product from "../models/Product.model"

// Funcion para obtener productos
export const getProducts = async (req: Request, res: Response) => {
    // Llamamos todos los productos
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({data: products})
}

// Funcion para obtener un solo producto
export const getProductById = async (req: Request, res: Response) => {
    // Extraemos el id de la url
    const {id} = req.params
    // Obtenemos el producto con el mismo id
    const product = await Product.findByPk(id)

    // Retornamos un error si no se encuentra el producto
    if(!product) {
        return res.status(404).json({error: 'Producto no encontrado.'})
    }

    res.json({data: product})
}


// Funcion para crear productos
export const createProduct = async (req : Request, res : Response) => {    
    // Creamos un nuevo producto y esperamos que se guarde a la base de datos
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    // Extraemos el id de la url
    const {id} = req.params
    // Obtenemos el producto con el mismo id
    const product = await Product.findByPk(id)

    // Retornamos un error si no se encuentra el producto
    if(!product) {
     return res.status(404).json({error: 'Producto no encontrado.'})
    }

    // Actualizar Productos
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const updateavailability =  async (req: Request, res: Response) => {
    // Extraemos el id de la url
    const {id} = req.params
    // Obtenemos el producto con el mismo id
    const product = await Product.findByPk(id)

    // Retornamos un error si no se encuentra el producto
    if(!product) {
     return res.status(404).json({error: 'Producto no encontrado.'})
    }

    // Actualizar Productos
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
     // Extraemos el ID de la url
     const {id} = req.params
     // Obtenemos el producto con el mismo ID
     const product = await Product.findByPk(id)
 
     // Retornamos un error si no se encuentra el producto
     if(!product) {
      return res.status(404).json({error: 'Producto no encontrado.'})
     }

     // Eliminamos el producto con el mismo ID
     await product.destroy()
     res.json({data: "Producto Eliminado"})
}