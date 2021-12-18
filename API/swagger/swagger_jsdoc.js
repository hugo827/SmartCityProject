const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'mangapi',
            version: '1.0.0',
        },
    },
    apis: [
        './controleur/*',
        './middleware/*',
        './modele/*',
        './route/*',
        './utils/*',
    ],
};

const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync('./swagger/spec.json', JSON.stringify(swaggerSpec));
