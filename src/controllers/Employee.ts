import { Request, Response } from 'express'

import connection from '../database'
import IEmployee from '../models/Employee'

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await connection('employees').select<IEmployee[]>()
  return res.json(employees)
}

export const createEmployee = async (req: Request, res: Response) => {
  const [employee] = await connection('employees').returning('*').insert<IEmployee[]>(req.body)
  return res.json(employee)
}
