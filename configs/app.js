'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 

import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
<<<<<<< HEAD
import hotelRoutes from '../src/hotel/hotel.routes.js'
=======
import eventsRoutes from '../src/events/events.routes.js'
>>>>>>> d6aa4529df5b14a473680cc6e67d94e3355ee65c

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
<<<<<<< HEAD
    app.use('/v1/hotel', hotelRoutes)
=======
    app.use('/v1/events', eventsRoutes)
>>>>>>> d6aa4529df5b14a473680cc6e67d94e3355ee65c
}

export const initServer = async()=> {
    const app = express()

    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.log('Server init failed', err)
    }
    
}