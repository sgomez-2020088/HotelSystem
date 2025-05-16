import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { addHotelRoom, deleteHotelRoom, getAllHotelRoom, getHotelById, updateHotelRoom } from "./hotelRoom.controller.js"

const api = Router()

api.post('/add',[validateJwt],addHotelRoom)
api.get('/getAll',[validateJwt], getAllHotelRoom)
api.delete('/delete/:id',[validateJwt], deleteHotelRoom)
api.put('/update/:id',[validateJwt], updateHotelRoom)
api.get('/getOne/:id',[validateJwt], getHotelById)

export default api