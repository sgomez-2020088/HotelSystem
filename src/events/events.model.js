import mongoose, { Schema, model} from "mongoose"

const eventsSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
    },
    date: {
        type: Date,
        required: [true, 'Event Day is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [100, `Can't be overcome 100 characters`]
    },
    resource: {
        type: String,
        required: [true, 'Resource is required']
    },
    extras: {
        type: String,
        maxLength: [100, `Can't be overcome 100 characters`]
    },
    status: {
        type: Boolean,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, 'Hotel is required']
    }
})


export default model('Events', eventsSchema)