import { Router } from "express"
import { addHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } from "./hotel.controller.js"
import { validateJwt, isAdmin} from '../../middlewares/validate.jwt.js'
import { addHotelValidator,updateHotelValidator } from "../../helpers/validators.js"


const api = Router()

api.post(
    '/add',
    [
        validateJwt,
        isAdmin,
        addHotelValidator
    ],
    addHotel
)

api.get('/getAll',[validateJwt,], getAllHotels)
api.get('/getOne/:id',[validateJwt], getHotelById) 
api.put('/update',[validateJwt, isAdmin,updateHotelValidator], updateHotel)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteHotel)

export default api

