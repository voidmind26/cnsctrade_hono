import type { Context } from 'hono'

export function notFoundHandler(c: Context) {
  return c.json(
    {
      code: 404,
      message: `Route ${c.req.method} ${c.req.path} not found`,
      timestamp: Date.now(),
    },
    404
  )
}
