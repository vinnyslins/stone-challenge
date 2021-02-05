import express from 'express'

import EmployeeRoutes from './routes/Employee'

const app = express()

app.use(express.json())
app.use('/api', EmployeeRoutes)

export default app
