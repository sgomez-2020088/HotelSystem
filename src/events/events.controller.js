
import Events from './events.model.js'

export const saveEvent = async(req, res) => {
    try {
        let data = req.body

        let event = new Events(data)
        event.status= 'ACEPT'

        await event.save()
        return res.send(
            {
                succes: true,
                message: `Succesfully the event: ${event.name}` 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error with saving events'
            }
        )
    }
}

