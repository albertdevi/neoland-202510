import { ExistenceError, OwnershipError, validate } from 'com'
import { data, ReelData } from '../data/index.js'

export function modifyReel(userId, reelId, textColor, backgroundColor) {
    validate.id(userId, 'userId')
    validate.name(textColor, 'textColor')
    validate.name(backgroundColor, 'backgroundColor')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findReelById(reelId)
        })
        .then(reelData => {
            if (!reelData) throw new ExistenceError('reel not found')

            if (reelData.ownerId !== userId) throw new OwnershipError('user not owner of reel')

            return data.updateReel(new ReelData(reelId, userId, textColor, backgroundColor))
        })
}