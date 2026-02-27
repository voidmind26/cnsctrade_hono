import { Hono } from 'hono'
import { userController } from '../controllers/user.controller.js'

const userRouter = new Hono()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.post('/', userController.createUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export { userRouter }
