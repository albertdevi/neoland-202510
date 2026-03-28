import { SystemError } from 'com'
import { UserModel } from '../mongoose/models/index.js'

export function updateUser(user) {
  return UserModel.updateOne({ _id: user.id }, user)
    .catch(error => { throw new SystemError(error.message) })
    .then(userModel => { })
}