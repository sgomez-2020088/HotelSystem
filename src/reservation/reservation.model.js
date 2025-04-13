import { Schema, model } from "mongoose"

const reservationSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        hotel:{
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel is required']
        },
        hotelRoom:{
            type: Schema.Types.ObjectId,
            ref: 'HotelRoom',
            required: [true, 'HotelRoom is required']
        },
        checkIn:{
            type: Date,
            required: [true, 'CheckIn is required']
        },
        checkOut:{
            type: Date,
            required: [true, 'CheckOut is required']
        },
        services:{
            type: String,
            required:[true, 'Services are required'],
        },
        total:{
            type: Number,
            default: 0,
            required: [true, 'Total is required']
        }
    }
)


export default model('Reservation', reservationSchema)