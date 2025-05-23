'use strict'
import HotelRoom from './hotelRoom.model.js'
import Hotel from '../hotel/hotel.model.js'

export const addHotelRoom = async (req, res) => {
    try {
    const { idHotel, number, ...data } = req.body

    const hotel = await Hotel.findById(idHotel)

    if (!hotel || hotel.status === false) {
        return res.status(400).send({
        success: false,
        message: 'Hotel not found or is inactive'
        })
    }

    const hotelRoomNumber = await HotelRoom.findOne({
        number,
        hotel: hotel._id
    })

    if (hotelRoomNumber) {
        return res.status(400).send({
        success: false,
        message: 'Already exists a room with this number in this hotel'
        })
    }

    const hotelRoom = new HotelRoom({
        ...data,
        number: number,
        hotel: hotel._id
    })

    await hotelRoom.save()

    return res.send({
        success: true,
        message: 'Hotel room added successfully',
        hotelRoom
    })
    } catch (err) {
    console.error(err)
    return res.status(500).send({
        success: false,
        message: 'General error',
        err
    })
    }
}

export const updateHotelRoom = async (req, res) => {
    try {
        const hotelRoomId = req.params.id
        const data = req.body

        const updatedHotelRoom = await HotelRoom.findByIdAndUpdate(
            hotelRoomId,
            data,
            { new: true }
        ).populate('hotel', 'name -_id')

        if (!updatedHotelRoom) {
            return res.status(404).send(
                { 
                    message: 'Hotel room not found', 
                    success: false 
                }
            )
        }

        return res.send({ message: 'Hotel room updated successfully', hotelRoom: updatedHotelRoom, success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error', 
                err, 
                success: false
            }
        )
    }
}

export const deleteHotelRoom = async (req, res) => {
    try {
        const id = req.params.id

        const deletedHotelRoom = await HotelRoom.findByIdAndUpdate(
            id, 
            {status:false}
        )

        if(!deletedHotelRoom) {
            return res.status(404).send(
                {
                    message: 'Hotel room not found', 
                    success: false
                }
            )
        }
        return res.send(
            {
                message: 'Hotel room deleted successfully', 
                success: true
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error', 
                err, 
                success: false
            }
        )
    }
}

export const getOneRoom = async (req, res) => {
    try {
        const id = req.params.id

        const room = await HotelRoom.findOne({ _id: id, status: true })

        if (!room) {
        return res.status(404).send({
            success: false,
            message: 'Room not found'
        })
        }

        const hotel = await Hotel.findOne({
        _id: room.hotel,
        status: true
        })

        if (!hotel) {
        return res.status(403).send({
            success: false,
            message: 'The room does not exist.'
        })
        }

        return res.status(200).send({
        success: true,
        message: 'Room found',
        room
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
        message: 'General error getting Room',
        err,
        success: false
        })
    }
}
  

export const getRoomsFromHotel = async(req, res) => {
    try {
        const { id }= req.params
        console.log(id);
        
        const hotel = await Hotel.findById(id)
        
    
        if(!hotel) return res.status(404).send({success: false,message: 'Hotel not found'})

        const rooms = await HotelRoom.find({hotel: id}).populate('hotel', 'name _id')

        if(rooms.length === 0) return res.status(200).send({success: true, message: 'This hotel has no rooms'})
        

        return res.status(200).send({success: true,message: 'Rooms found',rooms})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error getting Rooms from Hotel', err, success: false})}
}