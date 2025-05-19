import { Schema, model} from 'mongoose'

const hotelSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        maxLength: [25, 'Can´t be overcome 25 characters'],
    },
    address:{
        type: String,
        required: [true, 'Addres is required'],
        maxLength: [70, 'Can´t be overcome 70 characters']
    },
    category:{
        type: String, 
        required: [true, 'Category is required'],
        maxLength: [100, 'Can´t be overcome 100 characters'],
        enum: ['Hotel', 'Hostal', 'Casa de huéspedes', 'HotelNegocios', 'HotelBoutique', 'ComplejoHotelero', 'HotelAeropuerto', 'HotelMontana', 'HotelEcologico']
    },
    amenities:{
        type: String,
        required: [true, 'Amenities is required'],
        maxLength: [150, 'Can´t be overcome 150 characters']
    }
}, {timestamps: true})


export default model('Hotel', hotelSchema)