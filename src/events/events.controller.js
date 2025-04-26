
import Events from './events.model.js'

export const saveEvent = async(req, res) => {
    try {
        let data = req.body
        let event = new Events(data)
        event.status= true

        await event.save()
        return res.send({succes: true, message: `Succesfully the event: ${event.name}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({succes: false, message: 'General error with saving events'})
    }
}

export const getAllEvents = async(req, res) => {
    try {
        const events = await Events.find()
        if(!events.length === 0) return res.status (400).send({message: 'Events not found', success: false})
            return res.send({message: 'Events found', success: true, events})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}

export const getEventById = async(req, res) => {
    try {
        const { id }  = req.params
        const event = await Events.findById(id)
        if(!event) return res.status(404).send({message: 'Event not found', succes: false})
            return res.send({message: 'Event found', success: true, event})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}

export const updateEvent = async(req, res) => {
    try {
        const { id } = req.params
        const { ...data } = req.body

        const updatedEvent = await Events.findByIdAndUpdate(id, data, {new: true})
        if (!updatedEvent) return res.status(404).send({ message: 'Event not found', success: false})

            return res.send({  message: 'Event updated successfully', success: true, event: updatedEvent})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: false})
    }
}

export const deleteEvent = async(req, res) => {
    try {
        const {id} = req.params
        const deleteEvent = await Events.findByIdAndUpdate(id, {status: false})
        
        if(!deleteEvent) return res.status(404).send({message: 'Event not found'})
            return res.send({message: 'Event deleted successfully', success: true})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Genereal error', err, success: false})
        
    }
}