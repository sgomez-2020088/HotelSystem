import { Router } from "express"
import { addHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } from "./hotel.controller.js"
import { validateJwt} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add',[validateJwt],addHotel)
api.get('/getAll',[validateJwt], getAllHotels)
api.get('/getOne',[validateJwt], getHotelById) 
api.put('/update',[validateJwt], updateHotel)
api.delete('/delete',[validateJwt], deleteHotel)

export default api

