import { Router } from "express"
import { deleteEvent, getAllEvents, getEventById, saveEvent, updateEvent } from "./events.controller.js"

const api = Router()
api.post('/save',saveEvent)
api.get('/getAll', getAllEvents)
api.get('/getOne/:id', getEventById)
api.put('/update/:id', updateEvent)
api.delete('/delete/:id', deleteEvent)

export default api