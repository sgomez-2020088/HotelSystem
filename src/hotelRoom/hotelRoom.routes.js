import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { addHotelRoom, deleteHotelRoom, getOneRoom, getRoomsFromHotel, updateHotelRoom } from "./hotelRoom.controller.js"
import { hotelRoomValidator } from "../../helpers/validators.js"

const api = Router()

api.post('/add',[validateJwt],addHotelRoom)
api.put('/update/:id',[validateJwt], updateHotelRoom)
api.delete('/delete/:id',[validateJwt], deleteHotelRoom)
api.get('/find/:id', getOneRoom)
api.get('/:id/rooms' , getRoomsFromHotel)



export default api