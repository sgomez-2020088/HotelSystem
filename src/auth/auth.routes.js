import { Router } from 'express'
import { register,login } from './auth.controller.js'
import { uploadProfilePicture } from '../../middlewares/multer.uploads.js'
import { loginValidator, registerValidator } from '../../helpers/validators.js'

const api = Router()

//PUBLIC ROUTES
api.post('/register',[registerValidator,uploadProfilePicture.single('profilePicture')], register)

api.post('/login', [loginValidator], login)

export default api