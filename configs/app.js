'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 

import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import userRoutes from '../src/user/user.routes.js'
import hotelRoomRoutes from '../src/hotelRoom/hotelRoom.routes.js'
import eventsRoutes from '../src/events/events.routes.js'
import reservatrionRoutes from '../src/reservation/reservation.routes.js'
import { createDefaultAdmin } from './setUpData.js'
import billRoutes from '../src/bill/bill.routes.js'



const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/auth', authRoutes)
    app.use('/v1/hotel', hotelRoutes)
    app.use('/v1/hotelRoom', hotelRoomRoutes)
    app.use('/v1/events', eventsRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/reservation', reservatrionRoutes)
    app.use('/v1/bill', billRoutes)
}

export const initServer = async()=> {
    const app = express()

    try{
        await createDefaultAdmin()
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.log('Server init failed', err)
    }
    
}