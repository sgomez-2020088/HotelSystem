import { Router } from "express"
import { saveEvent } from "./events.controller.js"

const api = Router()
api.post(
    '/save',
    saveEvent
)

export default api