import { Router } from 'express'
import { addBill, getAllBill,getMyBills } from './bill.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()
api.post('/add',[validateJwt], addBill)
api.get('/getAll',[validateJwt], getAllBill)
api.get('/getMyBills',[validateJwt], getAllBill)

export default api