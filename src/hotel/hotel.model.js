import { Schema, model} from "mongoose"

const hotelSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Can´t be overcome 25 characters']
    },
    address:{
        type: String,
        required: [true, 'Addres is required'],
        maxLength: [70, 'Can´t be overcome 70 characters']
    },
    category:{
        type: String, 
        required: [true, 'Category is required'],
        maxLength: [100, 'Can´t be overcome 100 characters']
    },
    amenities:{
        type: String,
        required: [true, 'Amenities is required'],
        maxLength: [150, 'Can´t be overcome 150 characters']
    }
}, {timestamps: true})

userSchema.methos.toJSON = function(){
    const {__v, _id, ...hotel} = this.toObject()
    return hotel
}

export default model('Hotel', hotelSchema)