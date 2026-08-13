export interface ApiSuccess<T> { success: true; message: string; data: T }
export interface ApiFailure { success: false; message: string; errors: Record<string, string> }

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: Record<string, string> = {},
  ) { super(message); this.name = "ApiError"; }
}
