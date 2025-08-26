import express, { Express } from 'express'
import { applySecurity } from './middleware/security'
import { errorHandler } from './middleware/errorHandler'
import { rateLimit } from './middleware/rateLimit'
import transactionsRouter from './routes/transactions'

const app: Express = express()

applySecurity(app)
app.use(rateLimit)
app.use('/api', transactionsRouter)
app.use(errorHandler)

export default app
