import { Router } from 'express'
import { register,login } from './auth.controller.js'

const api = Router()

//PUBLIC ROUTES
api.post('/register', register)

api.post('/login', login)

export default api