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
        const hotelsRoom = await HotelRoom.find({ $nor: [{ status: false }] })
        if(!hotelsRoom.length === 0) return res.status(400).send({message: 'Hotels rooms not found', success: false})
            return res.send({message: 'Any room found', success: true, hotelsRoom})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}

export const getHotelById = async (req, res) => {
    try {
        const { id } = req.body
        const hotelRoom = await HotelRoom.findById(id)
        if(hotelRoom.status === false) return res.status(400).send({message: 'Hotel room not found', success: false})
        if(!hotelRoom) return res.status(404).send({message: 'Hotel Room not found', success: false})
            return res.send({message: 'Hotel room found', success: true, hotelRoom})
        } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error',err, success: false})
    }
}

export const updateHotelRoom = async (req, res) => {
    try {
        const hotelRoomId = req.body.id
        const data = req.body
        
        const updatedHotelRoom = await HotelRoom.findByIdAndUpdate(hotelRoomId, data, { new: true })
        if (!updatedHotelRoom) return res.status(404).send({ message: 'Hotel room not found', success: false })

        return res.send({ message: 'Hotel room updated successfully', hotelRoom: updatedHotelRoom, success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}


export const deleteHotelRoom = async (req, res) => {
    try {
        const id = req.body.id
        const deletedHotelRoom = await HotelRoom.findByIdAndUpdate(id, {status:false})
        if(!deletedHotelRoom) return res.status(404).send({message: 'Hotel room not found', success: false})
        return res.send({message: 'Hotel room deleted successfully', success: true})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}