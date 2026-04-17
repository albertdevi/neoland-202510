import { ExistenceError, OwnershipError, validate } from "com";
import { data } from '../data/index.js'
import { Reel } from './models/index.js'

export function getReel(userId, reelId) {
    validate.id(userId, 'userId')
    validate.id(reelId, 'reelId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findReelById(reelId)
        })
        .then(reelData => {
            if (!reelData) throw new ExistenceError('reel not found')

            if (reelData.ownerId !== userId) throw new OwnershipError('user not author of reel')

            const { id, ownerId, textColor, backgroundColor } = reelData

            return new Reel(id, ownerId, textColor, backgroundColor)
        })
}
