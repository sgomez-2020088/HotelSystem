import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { addHotelRoom, getAllHotelRoom, getHotelById } from "./hotelRoom.controller.js"

const api = Router()

api.post('/add',[validateJwt],addHotelRoom)
api.get('/getAll',[validateJwt], getAllHotelRoom)
api.get('/getOne',[validateJwt], getHotelById)

export default api