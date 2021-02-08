import { Request, Response } from 'express'

import connection from '../database'
import IEmployee from '../models/Employee'

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await connection('employees').select<IEmployee[]>().orderBy('id')
  return res.json(employees)
}

export const getEmployeeById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const employee = await connection<IEmployee>('employees').where({ id }).first()
  if (!employee) return res.status(404).json({ error: 'Employee not found' })

  return res.json(employee)
}

export const createEmployee = async (req: Request, res: Response) => {
  const [employee] = await connection('employees').returning('*').insert<IEmployee[]>(req.body)
  return res.status(201).json(employee)
}

export const updateEmployee = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const [employee] = await connection('employees')
    .where({ id })
    .returning('*')
    .update<IEmployee[]>(req.body)

  if (!employee) return res.status(404).json({ error: 'Employee not found' })

  return res.json(employee)
}

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const [employee] = await connection('employees')
    .where({ id })
    .returning('*')
    .delete<IEmployee[]>(req.body)

  if (!employee) return res.status(404).json({ error: 'Employee not found' })

  return res.json(employee)
}
