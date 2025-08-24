import cors from 'cors'
import helmet from 'helmet'
import type { Express } from 'express'
import { env } from '../config/env.js'

export function applySecurity(app: Express) {
  app.use(
    helmet({
      contentSecurityPolicy: false, // SPA assets
    })
  )

  app.use(
    cors({
      origin: env.allowedOrigin,
      credentials: false,
    })
  )
}
