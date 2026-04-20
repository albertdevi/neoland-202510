import { SystemError } from 'com'
import { ReelModel } from '../mongoose/index.js'

export function deleteAllReels() {
    return ReelModel.deleteMany()
    .catch(error => { throw new SystemError (error.message) })
    .then(result => { })
}