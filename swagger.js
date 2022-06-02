const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./config/routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})