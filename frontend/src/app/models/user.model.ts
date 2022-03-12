export interface User {
  _id: string,
  displayName: string,
  phoneNumber: string,
  token: string
}

export interface RegisterUserData {
  email: string,
  displayName: string,
  phoneNumber: string,
  password: string,
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}

export interface LoginError {
  error: string
}
