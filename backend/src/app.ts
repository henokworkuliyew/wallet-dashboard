import express from 'express';
import morgan from 'morgan';
import { applySecurity } from './middleware/security.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';
import transactions from './routes/transactions.js';


export function createApp() {
const app = express();
applySecurity(app);


app.use(express.json({ limit: '100kb' }));
app.use(morgan('dev'));


app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/transactions', apiLimiter, transactions);


app.use(errorHandler);
return app;
}