import type { Context } from 'hono'
import { userService } from '../services/user.service.js'
import { success, AppError } from '../utils/response.js'
import type { CreateUserRequest, UpdateUserRequest } from '../types/index.js'

export class UserController {
  async getAllUsers(c: Context) {
    const users = await userService.findAll()
    return c.json(success(users))
  }

  async getUserById(c: Context) {
    const id = c.req.param('id')
    const user = await userService.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return c.json(success(user))
  }

  async createUser(c: Context) {
    const body = await c.req.json<CreateUserRequest>()

    if (!body.name || !body.email) {
      throw new AppError('Name and email are required', 400)
    }

    const user = await userService.create(body)
    return c.json(success(user, 'User created successfully'), 201)
  }

  async updateUser(c: Context) {
    const id = c.req.param('id')
    const body = await c.req.json<UpdateUserRequest>()

    const user = await userService.update(id, body)
    return c.json(success(user, 'User updated successfully'))
  }

  async deleteUser(c: Context) {
    const id = c.req.param('id')
    await userService.delete(id)
    return c.json(success(null, 'User deleted successfully'))
  }
}

export const userController = new UserController()
