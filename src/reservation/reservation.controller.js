import User from "../user/user.model.js";
import Reservation from "./reservation.model.js";
import Hotel from "../hotel/hotel.model.js";
import HotelRoom from "../hotel/hotel.model.js";

export const addReservation = async (req, res) => {
    try {
        let data = req.body

        data.user = req.user.uid

        let hotelId = await Hotel.findById(data.hotelId)
        if(!hotelId) return res.status(404).send({ message: 'Hotel not found', success: false })

        let hotelRoomId = await HotelRoom.findById(data.hotelRoomId)
        if(!hotelRoomId) return res.status(404).send({ message: 'Hotel room not found', success: false })    
        
        let reservation = new Reservation(data)
        await reservation.save()
        
        return res.send({ message: 'Reservation added successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}
