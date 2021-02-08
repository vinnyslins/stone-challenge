import path from 'path'
import express from 'express'
import 'express-async-errors'
import yaml from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'

import EmployeeRoutes from './routes/Employee'
import Exception from './middlewares/Exception'

const swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yaml'))

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use('/api', EmployeeRoutes)
app.use(Exception)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
