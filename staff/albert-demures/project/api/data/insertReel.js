import { SystemError } from 'com'
import { ReelModel } from '../mongoose/index.js'
import { ReelData } from './models/index.js'

export function insertReel(reelData) {
    const { ownerId, textColor, backgroundColor } = reelData

    const reelModel = new ReelModel({ ownerId, textColor, backgroundColor })

    return reelModel.save()
        .then(reelModel => {

            return new ReelData(
                reelModel._id.toString(),
                reelModel.ownerId,
                reelModel.textColor,
                reelModel.backgroundColor
            )
        })
        .catch(error => { throw new SystemError(error.message) })
}