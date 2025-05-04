import { body } from 'express-validator' 
import { validateErrors} from './validate.errors.js'
import { existUser, exitEmailUser } from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Name cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('username', 'Email cannot be empty').notEmpty(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    body('address', 'Address cannot be empty').notEmpty(),
    validateErrors
]

export const loginValidator = [
    body('userInformation', 'userInformation cannot be empty').notEmpty().custom(existUser),
    body('password', 'Password cannot be empty').notEmpty(),
    validateErrors
]

export const hotelValidator = [
    body('name', 'Name cannot be empty or is too long').notEmpty().isLength({max: 25}),
    body('address', 'Address cannot be empty').notEmpty(),
    body('category', 'Category cannot be empty').notEmpty(),
    body('amenities', 'Amenities cannot be empty').notEmpty(),
    validateErrors
]

export const reservationValidator = [
    body('hotel', 'Hotel cannot be empty').notEmpty(),
    body('hotelRoom', 'Hotel room cannot be empty').notEmpty(),
    body('checkIn', 'Check in cannot be empty').notEmpty(),
    body('checkOut', 'Check out cannot be empty').notEmpty(),
    body('services', 'Services cannot be empty').notEmpty(),
    validateErrors
]

export const reservationHotelValidator = [
    body('hotelId', 'Hotel id cannot be empty').notEmpty(),
    validateErrors
]

export const cancelReservationValidator = [
    body('reservationId', 'Reservation id cannot be empty').notEmpty(),
    validateErrors
]