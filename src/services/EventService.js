import axios from 'axios'
var pword = process.env.MLAB
console.log(process.env.USER)
var connStringLocal = 'http://localhost:5000/api/posts'
//minori123
var connStringMlab =
  'mongodb://duser:' + pword + 'ds161335.mlab.com:61335/lismart'
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
  postTodos(todos) {
    return apiClient.post('/todos', todos)
  }
}
