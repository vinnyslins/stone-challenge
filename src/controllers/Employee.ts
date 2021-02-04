import { Request, Response } from 'express'

export const getEmployees = (req: Request, res: Response) => {
  return res.json({ message: 'Hello, Stone!!!' })
}
