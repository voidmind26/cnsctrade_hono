import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/error.middleware.js'
import { requestLogger } from './middleware/logger.middleware.js'
import { notFoundHandler } from './middleware/not-found.middleware.js'
import { success } from './utils/response.js'

const app = new Hono()

app.use('*', cors())
app.use('*', prettyJSON())
app.use('*', requestLogger)
app.use('*', errorHandler)

app.get('/', (c) => {
  return c.json(success({
    name: 'Cnsctrade API',
    version: '1.0.0',
    description: 'Hono backend framework with structured architecture',
  }, 'Welcome to Cnsctrade API'))
})

app.get('/health', (c) => {
  return c.json(success({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  }, 'Service is running'))
})

app.route('/api', apiRouter)

app.notFound(notFoundHandler)

export default app
