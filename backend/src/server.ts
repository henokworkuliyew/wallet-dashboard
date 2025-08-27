import app from './app.js'
import { PORT } from './config/env.js'

app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT} (ENV=${process.env.YAYA_ENV}, BASE_URL=${process.env.BASE_URL})`
  )
)
