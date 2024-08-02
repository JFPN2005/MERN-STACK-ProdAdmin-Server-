import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

// Nombre de la tabla
@Table({
    tableName: 'products'
})

// Definimos la columna de cada pruducto y su tipo de datos
class Product extends Model {
    // Nombre
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    // Precio
    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    // Disponibilidad del producto
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product