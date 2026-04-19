import { ExistenceError, validate } from 'com'
import { data, ReelData } from '../data/index.js'

export function modifyReel(userId, textColor, backgroundColor) {
    validate.id(userId, 'userId')
    validate.name(textColor, 'textColor')
    validate.name(backgroundColor, 'backgroundColor')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findReelByUserId(userId)
        })
        .then(reelData => {
            if (!reelData) throw new ExistenceError('reel not found')

            return data.updateReel(
                new ReelData(
                    reelData.id,
                    userId,
                    textColor,
                    backgroundColor
                )
            )
        })
}