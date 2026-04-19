import { SystemError } from "com";
import { ReelModel } from '../mongoose/index.js'
import { ReelData } from './models/index.js'

export function findReelByUserId(userId){
    return ReelModel.findOne({ ownerId: userId })
    .catch(error => { throw new SystemError(error.message) })
    .then(reelModel => {
        if (!reelModel) return null

        const { id, ownerId, textColor, backgroundColor} = reelModel

        return new ReelData ( id.toString() , ownerId.toString(), textColor, backgroundColor)
    })
}