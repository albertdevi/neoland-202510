 import { SystemError } from 'com'
 import { UserModel } from '../mongoose/models/index.js'
 
 export function insertUser(user) {
    const userModel = new UserModel(user)

    return userModel.save()
      .catch(error => { throw new SystemError(error.message) })
      .then(serModel => { })
  }