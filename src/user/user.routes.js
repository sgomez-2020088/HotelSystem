import { Router } from "express";
import { deleteOne, getAll, getOne, updatePassword, updateUser,updateUserRole } from "./user.controller.js";
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { getOneUserValidator , updateUserRoleValidator,updateUserValidator, updateUserPassValidator} from "../../helpers/validators.js";

const api = Router()

api.get('/getAll',[validateJwt, isAdmin], getAll)
api.get('/getOne',[validateJwt,isAdmin, getOneUserValidator],getOne)
api.put('/updateUser/:id',[validateJwt,updateUserValidator],updateUser)
api.put('/updatePassword/:uid',[validateJwt,updateUserPassValidator],updatePassword)
api.put('/updateRole',[validateJwt, isAdmin, updateUserRoleValidator],updateUserRole)
api.delete('/deleteOne/:uid',[validateJwt, isAdmin],deleteOne)

export default api