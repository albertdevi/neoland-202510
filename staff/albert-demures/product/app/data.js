//models

//Datis usuarios
function User(id, name, email, username, password, role) {
    this.id = id
    this.name = name
    this.email = email
    this.username = username
    this.password = password
    this.role = role
}

//Datos animales
function Pet(id, userId, chip, name, birthdate, species, race, colors) {
    this.id = id
    this.userId = userId
    this.chip = chip
    this.name = name
    this.birthdate = birthdate
    this.species = species
    this.race = race
    this.colors = colors
}

// manager

function Data(){
    this.users = []
    this.usersCount = 0
    this.pets = []
    this.petsCount = 0
}

//Añadir un usuario
Data.prototype.insertUser = function (user) {
    this.users.push(user)
    this.usersCount++
}


//Buscar Usuario por correo
Data.prototype.findUserByEmail = function (email) {
    for (let i = 0; i < this.users.length; i++){
        const user = this.users[i]
            if (user.email === email) return user
}
return null
}

// Buscar Usuario por Username
Data.prototype.findUserByUsername = function (username) {
    for (let i = 0; i < this.users.length; i++){
        const user = this.users[i]
            if (user.username=== username) return user
}
return null
}

// Función añadir una mascota
Data.prototype.insertPet = function (pet) {
    this.pets.push(pet)
    this.petsCount++
}

//Función buscar mascota por chip
Data.prototype.findPetByChip = function (chip) {
    for (let i=0; i < this.pets.length; i++){
        const pet = this.pets[i];
        if (pet.chip === chip) return pet;
    }
    return null;
}

// función bucar animal por Id
Data.prototype.getPetById = function (id){
    for (let i = 0; i < this.pets.length; i++){
        const pet = this.pets[i];
        if (pet.id === id) return pet;
    }
    return null;
}

//instance
const data = new Data()

