export class PetData {
  constructor(id, ownerId, /*chip,*/ name, /*gender,*/ birthdate, weight,/*species, race, colors*/ image) {
    this.id = id
    this.ownerId = ownerId
    this.name = name
    this.birthdate = birthdate
    this.weight = weight
    this.image = image
  }
}