import { initServer } from './server.js'
import { config } from 'dotenv'
import { connect } from 'mongoose'

config()
initServer()
connect()