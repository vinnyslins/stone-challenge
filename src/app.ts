import express from 'express'
import 'express-async-errors'

import EmployeeRoutes from './routes/Employee'
import Exception from './middlewares/Exception'

const app = express()

app.use(express.json())
app.use('/api', EmployeeRoutes)
app.use(Exception)

export default app
