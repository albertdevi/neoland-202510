import { SystemError } from 'com'
import { PetModel} from '../mongoose/models/index.js'

  export function insertPet(pet) {
    const { ownerId, name, birthdate, weight, image } = pet

    const petModel = new PetModel({ owner: ownerId, name, birthdate, weight, image })

    return petModel.save()
      .catch(error => { throw new SystemError(error.message) })
      .then(petModel => { })
  }