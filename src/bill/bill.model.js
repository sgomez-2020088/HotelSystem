import { Schema, model} from 'mongoose'

const billSchema = Schema ({
        reservation: {
            type: Schema.Types.ObjectId,
            ref: 'Reservation',
            required: [true, 'Reservation id is required']
        },
        total: {
            type: Number
        }
    }, {timestamp: true}
)
 export default model('Bill', billSchema)
