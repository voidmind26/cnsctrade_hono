import type { User, CreateUserRequest, UpdateUserRequest } from '../types/index.js'
import { AppError } from '../utils/response.js'

class UserService {
  private users: Map<string, User> = new Map()

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values())
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async create(data: CreateUserRequest): Promise<User> {
    const existingUser = Array.from(this.users.values()).find(
      (u) => u.email === data.email
    )
    if (existingUser) {
      throw new AppError('User with this email already exists', 409)
    }

    const now = new Date().toISOString()
    const user: User = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    this.users.set(user.id, user)
    return user
  }

  async update(id: string, data: UpdateUserRequest): Promise<User> {
    const user = this.users.get(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (data.email && data.email !== user.email) {
      const existingUser = Array.from(this.users.values()).find(
        (u) => u.email === data.email
      )
      if (existingUser) {
        throw new AppError('User with this email already exists', 409)
      }
    }

    const updatedUser: User = {
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    this.users.set(id, updatedUser)
    return updatedUser
  }

  async delete(id: string): Promise<void> {
    const user = this.users.get(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    this.users.delete(id)
  }
}

export const userService = new UserService()
