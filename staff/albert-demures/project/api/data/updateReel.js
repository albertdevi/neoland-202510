import { SystemError } from 'com'
import { ReelModel } from '../mongoose/index.js'

export function updateReel(reelData){
    return ReelModel.updateOne({ _id: reelData.id}, { $set:reelData})
    .catch(error => { throw new SystemError(error.message) })
    .then(result => { })
}