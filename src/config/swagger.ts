import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'ProdAdmin',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
    .swagger-ui .topbar {
        background-color: #def6f6;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .topbar-wrapper .link {
        content: url('https://github.com/JFPN2005/Imgs/blob/main/ProAdmin_Logo.jpg?raw=true');
        background-position: center;
        width: 100px;
        height: 100px;
        object-fit: contain;
        margin-left: -5rem;
    }
    `,
    customSiteTitle: 'Documentacion Rest Api - ProdAdmin'
}

export default swaggerSpec
export {swaggerUiOptions}