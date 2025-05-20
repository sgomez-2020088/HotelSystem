import Bill from './bill.model.js'
import Reservation from '../reservation/reservation.model.js'

export const addBill = async (req, res) => {
    try {
      const { reservationId} = req.body
  
      const reservation = await Reservation.findById(reservationId)
      if (!reservation) return res.status(404).send({ message: 'Reservation not found', success: false })
      

      const IVA = reservation.total + (reservation.total * 0.12)
  
      const billData = {
        reservation: reservationId,
        total: IVA
      }
  
      const bill = new Bill(billData)
      await bill.save()
  
      return res.send({ message: 'Bill added successfully', success: true, bill })
    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'General error adding bill', success: false })
    }
  }

export const getAllBill = async (req, res)=>{
    try {

        const bills = await Bill.find() 
        .populate({
            path: 'reservation',
                populate: [
                    {path: 'user', select: 'name email -_id'},
                    {path: 'hotel', select: 'name location -_id'},
                    {path: 'hotelRoom', select: 'number type price -_id'}
                ]
        })
      
        if(!bills.length === 0) return res.status(400).send({message: 'bills not found', success: false })
            
            return res.send({message: 'Bills found', success: true, bills                })

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error getting all bills', success: false})
    }
}