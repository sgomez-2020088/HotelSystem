import Hotel from './hotel.model.js'

export const addHotel = async (req, res) => {
    try {
        let data = req.body
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send({message: 'Hotel added succesfully', success: true})

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error',err, success: false })

    }
}

export const getAllHotels = async (req,res ) =>{
    try {
        const hotels = await Hotel.find()
        if(!hotels.length === 0) return res.status(400).send({message: 'Hotels not found', success: false})
            return res.send({message: 'Hotels found', success: true, hotels})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', err, success: false})
    }
}

export const getHotelById = async (req, res) => {
    try {
        const { id } = req.body
        const hotel = await Hotel.findById(id)
        if(!hotel) return res.status(404).send({message: 'Hotel not found', success: false})
            return res.send({message: 'Hotel found', success: true, hotel})
        } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error',err, success: false})
    }
}

export const updateHotel = async (req, res) => {
    try {
        const hotelId = req.body.id  
        const data = req.body 

        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, data, { new: true })  
        if (!updatedHotel) return res.status(404).send({ message: 'Hotel not found', success: false })
        
        return res.send({ message: 'Hotel updated successfully', hotel: updatedHotel, success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}


export const deleteHotel = async (req, res) => {
    try {
        const id = req.body.id
        const deletedHotel = await Hotel.findByIdAndUpdate(id, {status:false})
        if(!deletedHotel) return res.status(404).send({message: 'Hotel not found', success: false})
            return res.send({message: 'Hotel deleted successfully', success: true})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error',err, success: false})
    }
}