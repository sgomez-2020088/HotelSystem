
import { Router } from "express";
import { addReservation,getReservationsHotel } from "./reservation.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/reservate',[validateJwt], addReservation)
api.get('/reservationsHotel',[validateJwt], getReservationsHotel)

export default api