import express, { Express } from 'express'
import cors from 'cors'
import { applySecurity } from './middleware/security.js'
import { errorHandler } from './middleware/errorHandler.js'
import { rateLimit } from './middleware/rateLimit.js'
import transactionsRouter from './routes/transactions.js'

const app: Express = express()

const corsOptions = {
  origin:
    process.env.FRONTEND_URL || 'https://yaya-wallet-dashboard.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions)) 

applySecurity(app)
app.use(rateLimit)
app.use('/api', transactionsRouter)
app.use(errorHandler)

export default app
