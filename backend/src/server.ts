import app from './app'
import { PORT } from './config/env'

app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT} (ENV=${process.env.YAYA_ENV}, BASE_URL=${process.env.BASE_URL})`
  )
)
