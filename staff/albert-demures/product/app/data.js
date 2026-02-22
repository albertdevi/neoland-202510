//manager

class Data {
  // función para establacer un usuario conectado
  setLoggedInUserId(userId) {
    sessionStorage.userId = userId
  }


  // función para conseguir el ID del usuario conectado
  getLoggedInUserId() {
    return sessionStorage.userId
  }

  removeLoggedInUserId(){
    delete sessionStorage.userId
  }

}
// crear nueva coleción de datos

export const data = new Data()
