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
    validateErrors
]

export const loginValidator = [
    body('userInformation', 'userInformation cannot be empty').notEmpty().custom(existUser),
    body('password', 'Password cannot be empty').notEmpty(),
    validateErrors
]

export const getOneUserValidator = [
    body('id','User id cannot be empty').notEmpty(),
    validateErrors
]

export const updateUserRoleValidator = [
    body('id','User id cannot be empty').notEmpty(),
    body('role','Role cannot be empty').notEmpty(),
    validateErrors
]

export const updateUserValidator = [
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Name cannot be empty').optional().notEmpty(),
    body('email', 'Email cannot be empty').optional().notEmpty().isEmail().custom(exitEmailUser),
    body('username', 'Email cannot be empty').optional().notEmpty(),
    body('phone', 'Phone cannot be empty').optional().notEmpty().isMobilePhone(),
    validateErrors
]

export const updateUserPassValidator = [
    body('currentPassword', 'Current password cannot be empty').notEmpty(),
    body('newPassword', 'New password cannot be empty').notEmpty(),
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
    body('idReservation', 'Reservation id cannot be empty').notEmpty(),
    validateErrors
]

export const eventsValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('date', 'Date cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty'). notEmpty(),
    body('resource', 'Resource cannot be empty').notEmpty(),
    body('extras', 'Extras cannot be empty').notEmpty(),
    body('status', 'Status cannot be empty').notEmpty(),
    body('hotel', 'Hotel id cannot be empty').notEmpty(),

    validateErrors
]