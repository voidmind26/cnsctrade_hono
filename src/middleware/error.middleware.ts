import type { Context, Next } from 'hono'
import { AppError } from '../utils/response.js'
import { logger } from '../utils/logger.js'

export async function errorHandler(c: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    logger.error('Request error', {
      error: err instanceof Error ? err.message : 'Unknown error',
      path: c.req.path,
      method: c.req.method,
    })

    if (err instanceof AppError) {
      return c.json(
        {
          code: err.code,
          message: err.message,
          details: err.details,
          timestamp: Date.now(),
        },
        err.code as 200
      )
    }

    if (err instanceof Error) {
      return c.json(
        {
          code: 500,
          message: err.message || 'Internal Server Error',
          timestamp: Date.now(),
        },
        500
      )
    }

    return c.json(
      {
        code: 500,
        message: 'Internal Server Error',
        timestamp: Date.now(),
      },
      500
    )
  }
}
