import { Router } from 'express'
import { register,login } from './auth.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { loginValidator } from '../../helpers/validators.js'

const api = Router()

//PUBLIC ROUTES
api.post('/register',[uploadProfilePicture.single('profilePicture')], register)

api.post('/login', [loginValidator], login)

export default api