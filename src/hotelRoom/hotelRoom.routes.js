import { Router } from "express"
import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js"
import { addHotelRoom, deleteHotelRoom, getOneRoom, getRoomsFromHotel, updateHotelRoom } from "./hotelRoom.controller.js"
import { addHotelRoomValidator, updateHotelRoomValidator } from "../../helpers/validators.js"

const api = Router()

api.post('/add',[validateJwt,isAdmin],addHotelRoom)
api.put('/update/:id',[validateJwt,isAdmin], updateHotelRoom)
api.delete('/delete/:id',[validateJwt,isAdmin], deleteHotelRoom)
api.get('/find/:id', getOneRoom)
api.get('/:id/rooms' , getRoomsFromHotel)



export default api