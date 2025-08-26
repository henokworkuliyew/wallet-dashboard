import cors from 'cors'
import express, { Express } from 'express'

export const applySecurity = (app: Express) => {
  app.use(cors())
  app.use(express.json())
}
