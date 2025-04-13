import { Schema, model } from 'mongoose';

const hotelRoomSchema = Schema(
    {
        number: {
            type: String,
            required: [true, 'Room number is required'],
        },
        type: {
            type: String,
            required: [true, 'Room type is required'],
            enum: ['single', 'double', 'triple', 'familiar', 'suite'],
        },
        price: {
            type: Number,
            required: [true, 'Room price is required'],
        },
        description: {
            type: String,
            required: [true, 'Room description is required'],
        },
        imagen: {
            type:String
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel ID is required'],
        },
    }
)

export default model('HotelRoom', hotelRoomSchema)