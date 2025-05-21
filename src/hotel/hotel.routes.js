import { Router } from "express"
import { addHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } from "./hotel.controller.js"
import { validateJwt} from '../../middlewares/validate.jwt.js'
import { hotelValidator } from "../../helpers/validators.js"
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js"
import { uploadHotelPicture } from '../../middlewares/multer.uploads.js'

const api = Router()

api.post(
    '/add',
    [
        validateJwt,
        uploadHotelPicture.single('hotelImages'),
        hotelValidator,
        deleteFileOnError
    ],
    addHotel
)

api.get('/getAll',[validateJwt], getAllHotels)
api.get('/getOne/:id',[validateJwt], getHotelById) 
api.put('/update',[validateJwt], updateHotel)
api.delete('/delete/:id',[validateJwt], deleteHotel)

export default api

