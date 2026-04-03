import { model } from 'mongoose'
import { newSchema } from '../schemas/index.js'

export const NewModel = model('New', newSchema)