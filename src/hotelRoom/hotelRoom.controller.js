'use strict'
import HotelRoom from './hotelRoom.model.js'

export const addHotelRoom = async (req, res) => {
    try {
        const data = req.body
        const hotelRoom = new HotelRoom(data)
        await hotelRoom.save()

        return res.send({ message: 'Hotel room added successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err, success: false })
    }
}

export const getAllHotelRoom = async (req,res ) =>{
    try {
        const hotelsRoom = await HotelRoom.find()
        if(!hotelsRoom.length === 0) return res.status(400).send({message: 'Hotels rooms not found', success: false})
            return res.send({message: 'Hotels rooms found', success: true, hotelsRoom})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}

export const getHotelById = async (req, res) => {
    try {
        const { id } = req.body
        const hotelRoom = await HotelRoom.findById(id)
        if(!hotelRoom) return res.status(404).send({message: 'Hotel Room not found', success: false})
            return res.send({message: 'Hotel room found', success: true, hotelRoom})
        } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error',err, success: false})
    }
}