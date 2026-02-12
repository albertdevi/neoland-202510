//manager

class Data {
  constructor() {
    this.loggedInUserId = null
  }

  // función para establacer un usuario conectado
  setLoggedInUserId(userId) {
    this.loggedInUserId = userId
  }


  // función para conseguir el ID del usuario conectado
  getLoggedInUserId() {
    return this.loggedInUserId
  }

}
// crear nueva coleción de datos

export const data = new Data()
