
import { Router } from "express";
import { addReservation } from "./reservation.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/reservate',[validateJwt], addReservation)

export default api