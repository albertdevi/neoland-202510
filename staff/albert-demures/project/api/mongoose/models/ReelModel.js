import { model } from 'mongoose'
import { reelSchema } from '../schemas/index.js'

export const ReelModel = model ('Reel', reelSchema)