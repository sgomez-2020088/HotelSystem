import { Router } from 'express'
import { addBill, getAllBill } from './bill.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()
api.post('/add',[validateJwt], addBill)
api.get('/getAll',[validateJwt], getAllBill)

export default api