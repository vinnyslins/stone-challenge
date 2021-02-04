import { Router } from 'express'

import * as controller from '../controllers/Employee'

const routes = Router()

routes.get('/employees', controller.getEmployees)

export default routes
