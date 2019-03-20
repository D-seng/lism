import axios from 'axios'
const USR = process.env.VUE_APP_DBUSER
const PWD = process.env.VUE_APP_DBPASSWORD

// console.log(DBUSER)
var connStringLocal = 'http://localhost:5000/api/posts'
//minori123
var connStringMlab = `mongodb://${USR}:${PWD}@ds161335.mlab.com:61335/lismart`
// 'mongodb+srv://darren-user:<password>cluster0-rh3ve.mongodb.net/test?retryWrites=true'
//'mongodb://duser:minori123ds161335.mlab.com:61335/lismart'
const apiClient = axios.create({
  baseURL: connStringMlab,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEventsUnpaginated() {
    return apiClient.get('/leases')
  },
  getEvent(id) {
    return apiClient.get('/leases/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
  getTodo(id) {
    return apiClient.get('/' + id)
  },
  getTodos() {
    return apiClient.get('/5c83011be7179a3e36e447c6')
  },
  // getTodos() {
  //   return apiClient.get('/todos')
  // },
  getToDonts() {
    return apiClient.get('/todonts')
  },
  putTodos(post, id) {
    return apiClient.put('/' + id, post)
  },
  deleteTodos() {
    return apiClient.delete('/todos/')
  },
  postTodos(post) {
    return apiClient.post('/', post)
  }
}
