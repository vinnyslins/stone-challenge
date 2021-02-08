import { Request, Response, NextFunction } from 'express'
import { isCelebrate } from 'celebrate'

const Exception = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrate(err)) return res.status(400).json({ error: err.message })

  return res.status(500).json({ error: 'Internal server error.' })
}

export default Exception
