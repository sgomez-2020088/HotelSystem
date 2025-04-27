import User from "../user/user.model.js"
import Reservation from "./reservation.model.js"
import Hotel from "../hotel/hotel.model.js"
import HotelRoom from "../hotelRoom/hotelRoom.model.js"

export const addReservation = async (req, res) => {
    try {
        let data = req.body

        data.user = req.user.uid

        let checkIn = new Date(data.checkIn).getUTCDate()
        let checkOut = new Date(data.checkOut).getUTCDate()
        
        let hotelId = await Hotel.findById(data.hotel)
        if(!hotelId) return res.status(404).send({ message: 'Hotel not found', success: false })
            
        let hotelRoomId = await HotelRoom.findById(data.hotelRoom)
        let days = checkOut - checkIn
        data.total = (hotelRoomId.price * days)
        if(!hotelRoomId) return res.status(404).send({ message: 'Hotel room not found', success: false })    
        
        let reservation = new Reservation(data)
        await reservation.save()
        
        return res.send({ message: 'Reservation added successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getReservationsHotel = async (req, res) => {
    try {
        let {hotelName} = req.body

        let hotel = await Hotel.findById(hotelName)    
        if(!hotel) return res.status(404).send({ message: 'Hotel not found', success: false })
        
        let reservations = await Reservation.find({hotel: hotelName})
        if(!reservations) return res.status(404).send({ message: 'Reservations not found', success: false })
            
        return res.send({success: true, message:'Reservations found', reservations})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

//Get My Reservations
export const getMyReservations = async (req, res) => {
    try {
        let userId = req.user.uid
        let reservations = await Reservation.find(
            { 
                $and:[
                    {user:userId },
                    {status:"confirmed"}        
                ] 
            }
        )
        if(reservations.length === 0) return res.status(404).send({success:false,message:'You do not have reservations'})
        return res.send({success:true, message:'Reservations found', reservations})
        } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getMyHistoryReservations = async(req,res)=>{
    try {
        let userId = req.user.uid
        let reservations = await Reservation.find(
            { 
                $and:[
                    {user:userId },
                    {status:"completed"}        
                ] 
            }
        )
        if(reservations.length === 0) return res.status(404).send({success:false,message:'You do not have reservations'})
        return res.send({success:true, message:'Your history of reservation', reservations})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}





