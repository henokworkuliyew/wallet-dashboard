import { Router } from 'express'
import { z } from 'zod'
import * as yaya from '../services/yayaClient.js'
import type { Paginated, UpstreamTransaction } from '../types/transactions.js'

const router = Router()

const querySchema = z.object({
  p: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().positive().catch(1)),
})

const searchSchema = z.object({
  query: z.string().min(1, 'query is required'),
})

router.get('/', async (req, res, next) => {
  try {
    const { p } = querySchema.parse(req.query)
    const page = p ?? 1
    const result = (await yaya.findByUser(
      page
    )) as Paginated<UpstreamTransaction>
    res.json(mapTransactions(result))
  } catch (err) {
    next(err)
  }
})

router.post('/search', async (req, res, next) => {
  try {
    const { p } = querySchema.parse(req.query)
    const body = searchSchema.parse(req.body)
    const page = p ?? 1
    const result = await yaya.search(body.query, page)
    res.json(mapTransactions(result))
  } catch (err) {
    next(err)
  }
})

function mapTransactions(p: Paginated<UpstreamTransaction>) {
  return p
}

export default router
