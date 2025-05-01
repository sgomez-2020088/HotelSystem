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

        let existReservation = await Reservation.findOne({
            $and:[
                {hotel:data.hotel},
                {hotelRoom:data.hotelRoom},
                {status:'confirmed'}
            ],
            $or:[
                {checkIn:data.checkIn},
                {checkOut:data.checkOut}
            ]
        })
        console.log(existReservation)
        if(existReservation) return res.status(404).send({ message: 'This hotel room is already reserved', success: false })

        let hotelId = await Hotel.findById(data.hotel)
        if(!hotelId) return res.status(404).send({ message: 'Hotel not found', success: false })
            
        let hotelRoomId = await HotelRoom.findById(data.hotelRoom)
        
        let days = checkOut - checkIn
        data.total = (hotelRoomId.price * days)

        if(!hotelRoomId) return res.status(404).send({ message: 'Hotel room not found', success: false })    
        
        if(hotelRoomId.hotel != data.hotel) return res.status(404).send({ message: 'Hotel room does not belong to this hotel', success: false })  
        
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

export const cancelReservation = async(req,res)=>{
    try {
        let {idReservation} = req.body

        let reservation = await Reservation.findById(idReservation)
        if(!reservation) return res.status(404).send({success:false,message:'Reservation not found'})
        
        if(reservation.user != req.user.uid)return res.status(404).send({sucess:false, message:'You do not have access to this reservation'})
    
        if(reservation.status != 'confirmed') return res.status(404).send({success:false,message:'Reservation already canceled'})

        let reservationCanceled = await Reservation.findByIdAndUpdate(
            idReservation,{status:'canceled'}, {new:true}
        )
        if(!reservationCanceled) return res.status(404).send({success:false,message:'Reservation not found'})
        return res.send({success:true, message:'Reservation canceled successfully', reservationCanceled})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}





