import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import * as controller from '../controllers/Employee'

const routes = Router()

routes.get('/employees', controller.getEmployees)

routes.get('/employees/:id', controller.getEmployeeById)

routes.post('/employees', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    position: Joi.string().required()
  })
}), controller.createEmployee)

routes.put('/employees/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().integer().positive().required()
  },
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    position: Joi.string().required()
  })
}), controller.updateEmployee)

routes.delete('/employees/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().integer().positive().required()
  }
}), controller.deleteEmployee)

export default routes
