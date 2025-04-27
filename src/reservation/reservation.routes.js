
import { Router } from "express";
import { addReservation,getMyHistoryReservations,getMyReservations,getReservationsHotel } from "./reservation.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";


const api = Router()

api.post('/reservate',[validateJwt], addReservation)
api.get('/reservationsHotel',[validateJwt], getReservationsHotel)
api.get('/myReservations',[validateJwt],getMyReservations)
api.get('/myHistoryReservations',[validateJwt],getMyHistoryReservations)

export default api