// models

//Función para añadir usuarios
class User {
  constructor(id, name, email, username, password, role) {
    this.id = id
    this.name = name
    this.email = email
    this.username = username
    this.password = password
    this.role = role
  }
}

// Función para añadir mascotas

class Pet {
  constructor(id, userId, /*chip,*/ name, /*gender,*/ birthdate, weight,/*species, race, colors*/ image) {
    this.id = id
    this.userId = userId
    // this.chip = chip
    this.name = name
    // this.gender = gender
    this.birthdate = birthdate
    this.weight = weight
    //  this.species = species
    // this.race = race
    // this.colors = colors
    this.image = image
  }
}

//manager
// función para añadir información general

class Data {
  constructor() {
    this.users = []
    this.usersCount = 0
    this.pets = []
    this.petsCount = 0
    this.loggedInUserId = null
  }

  // función para añadir un usuario
  insertUser(user) {
    this.users.push(user)
    this.usersCount++
  }

  //funión para buscar un usuario por su correo
  findUserByEmail(email) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i]

      if (user.email === email) return user
    }

    return null;
  }

  // función para buscar un usuario por su username
  findUserByUsername(username) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i]

      if (user.username === username) return user
    }

    return null
  }

  // función para buscar un usuario por su Id
  findUserById(id) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i]

      if (user.id === id) return user
    }

    return null
  }

  // función para añadir una mascota
  insertPet(pet) {
    this.pets.push(pet)
    this.petsCount++
  }

  //función para buscar una mascota según el id del usuario

  findPetsByUserId(userId) {
    const foundPets = []

    for (let i = 0; i < this.pets.length; i++) {
      const pet = this.pets[i]

      if (pet.userId === userId)
        foundPets.push(pet)
    }

    return foundPets
  }

  findPetById(petId) {
    for (let i = 0; i < this.pets.length; i++) {
      const pet = this.pets[i]

      if (pet.id === petId)
        return pet
    }

    return null
  }
}

// crear nueva coleción de datos
const data = new Data()

module.exports = {
  User,
  Pet,
  data
}
