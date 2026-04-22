import { SystemError } from 'com'
import { ReelModel } from '../mongoose/index.js'

export function insertReel(reelData) {
    const { ownerId, textColor, backgroundColor } = reelData

    const reelModel = new ReelModel({ owner: ownerId, textColor, backgroundColor })

    return reelModel.save()
        .catch(error => { throw new SystemError(error.message) })
        .then(reelModel => { })
}