
export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser } from './getUser.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUser,
}