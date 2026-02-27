import { Hono } from 'hono'
import { userRouter } from './user.routes.js'

const apiRouter = new Hono()

apiRouter.route('/users', userRouter)

export { apiRouter }
