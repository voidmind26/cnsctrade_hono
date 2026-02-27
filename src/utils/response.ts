import type { ApiResponse, ApiError } from '../types/index.js'

export function success<T>(data: T, message = 'success'): ApiResponse<T> {
  return {
    code: 0,
    message,
    data,
    timestamp: Date.now(),
  }
}

export function error(message: string, code = 500, details?: Record<string, unknown>): ApiError {
  return {
    code,
    message,
    details,
  }
}

export class AppError extends Error {
  public readonly code: number
  public readonly details?: Record<string, unknown>

  constructor(message: string, code = 500, details?: Record<string, unknown>) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.details = details
  }
}
