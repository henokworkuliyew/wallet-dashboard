import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('API Error:', err.response?.data || err.message)
  res.status(err.response?.status || 500).json({ error: err.message })
}
