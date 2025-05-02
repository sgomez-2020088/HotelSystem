
import { Router } from "express";
import { addReservation,cancelReservation,getMyHistoryReservations,getMyReservations,getReservationsHotel } from "./reservation.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { cancelReservationValidator, reservationHotelValidator, reservationValidator } from "../../helpers/validators.js";


const api = Router()

api.post('/reservate',[validateJwt,reservationValidator], addReservation)
api.get('/reservationsHotel',[validateJwt, reservationHotelValidator], getReservationsHotel)
api.get('/myReservations',[validateJwt],getMyReservations)
api.get('/myHistoryReservations',[validateJwt],getMyHistoryReservations)
api.delete('/deleteReservation',[validateJwt, cancelReservationValidator], cancelReservation)

export default api