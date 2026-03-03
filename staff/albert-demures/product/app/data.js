//manager

class Data {
  // función para establacer un usuario conectado
  setToken(token) {
    sessionStorage.token = token
  }


  // función para conseguir el ID del usuario conectado
  getLoggedInToken() {
    return sessionStorage.token
  }

  removeLoggedInToken(){
    delete sessionStorage.token
  }

}
// crear nueva coleción de datos

export const data = new Data()
