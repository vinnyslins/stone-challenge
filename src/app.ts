import express from 'express'

import EmployeeRoutes from './routes/Employee'

const app = express()

app.use('/api', EmployeeRoutes)

export default app
