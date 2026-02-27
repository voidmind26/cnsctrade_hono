import type { Context, Next } from 'hono'
import { logger } from '../utils/logger.js'

export async function requestLogger(c: Context, next: Next) {
  const start = Date.now()
  const requestId = crypto.randomUUID()

  c.set('requestId', requestId)

  logger.info('Request started', {
    requestId,
    method: c.req.method,
    path: c.req.path,
    query: c.req.query(),
  })

  await next()

  const duration = Date.now() - start

  logger.info('Request completed', {
    requestId,
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
  })
}
