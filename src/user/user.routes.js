import { Router } from "express";
import { deleteOne, getAll, getOne, updatePassword, updateUser } from "./user.controller.js";
import { validateJwt } from '../../middlewares/validate.jwt.js'
 
const api = Router()
 
api.get('/getAll',[validateJwt], getAll)
api.get('/getOne',[validateJwt],getOne)
api.put('/updateUser',[validateJwt],updateUser)
api.put('/updatePassword',[validateJwt],updatePassword)
api.delete('/deleteOne',[validateJwt],deleteOne)
 
export default api