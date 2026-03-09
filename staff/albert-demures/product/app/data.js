//manager

class Data {
  // función para establacer un usuario conectado
  setToken(token) {
    sessionStorage.token = token
  }


  // función para conseguir el ID del usuario conectado
  getToken() {
    return sessionStorage.token
  }

  removeToken(){
    delete sessionStorage.token
  }

}
// crear nueva coleción de datos

export const data = new Data()
