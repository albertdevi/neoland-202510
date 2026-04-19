import { ExistenceError, validate } from "com"
import { data } from '../data/index.js'
import { Reel } from './models/index.js'

export function getReel(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findReelByUserId(userId)
        })
        .then(reelData => {
            if (!reelData) throw new ExistenceError('reel not found')

            const { id, ownerId, textColor, backgroundColor } = reelData

            return new Reel(id, ownerId, textColor, backgroundColor)
        })
}