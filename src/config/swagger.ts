import { describe } from "node:test";
import swaggerJSDoc from "swagger-jsdoc";

// Configuração do Swagger
const options ={
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API de Alunos',
            version: '1.0.00',
            description: 'API rest para gerenciar alunos',
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Servidor local de desenvolvimento'
        }]
    },
    apis: [
        './src/routes/*.ts', './src/controllers/*.ts'
    ]
};

export const swaggerSpec = swaggerJSDoc(options);