import { SystemError } from "com";
import { ReelModel } from '../mongoose/index.js'
import { ReelData } from './models/index.js'

export function findReelById(reelId){
    return ReelModel.findById(reelId)
    .catch(error => { throw new SystemError(error.message) })
    .then(reelModel => {
        if (!reelModel) return null

        const { id, owner, textColor, backgroundColor} = reelModel

        return new ReelData ( id, owner.toString(), textColor, backgroundColor)
    })
}