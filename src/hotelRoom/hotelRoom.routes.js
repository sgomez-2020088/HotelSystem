import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { addHotelRoom, deleteHotelRoom, getAllHotelRoom, getHotelById, updateHotelRoom } from "./hotelRoom.controller.js"

const api = Router()

api.post('/add',[validateJwt],addHotelRoom)
api.get('/getAll',[validateJwt], getAllHotelRoom)
api.get('/getOne',[validateJwt], getHotelById)
api.put('/update',[validateJwt], updateHotelRoom)
api.delete('/delete',[validateJwt], deleteHotelRoom)

export default api