import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import * as controller from '../controllers/Employee'

const routes = Router()

routes.get('/employees', controller.getEmployees)

routes.post('/employees', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    position: Joi.string().required()
  })
}), controller.createEmployee)

export default routes
