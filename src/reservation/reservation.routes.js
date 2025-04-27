
import { Router } from "express";
import { addReservation,cancelReservation,getMyHistoryReservations,getMyReservations,getReservationsHotel } from "./reservation.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";


const api = Router()

api.post('/reservate',[validateJwt], addReservation)
api.get('/reservationsHotel',[validateJwt], getReservationsHotel)
api.get('/myReservations',[validateJwt],getMyReservations)
api.get('/myHistoryReservations',[validateJwt],getMyHistoryReservations)
api.delete('/deleteReservation',[validateJwt], cancelReservation)

export default api