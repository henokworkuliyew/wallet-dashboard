import express, { Express } from 'express'
import { applySecurity } from './middleware/security.js'
import { errorHandler } from './middleware/errorHandler.js'
import { rateLimit } from './middleware/rateLimit.js'
import transactionsRouter from './routes/transactions.js'

const app: Express = express()

applySecurity(app)
app.use(rateLimit)
app.use('/api', transactionsRouter)
app.use(errorHandler)

export default app
