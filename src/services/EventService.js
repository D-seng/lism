import axios from 'axios'

var connStringLocal = 'http://localhost:5000/api/posts'
var connStringMlab = 'mongodb://d-user:minori123@ds161335.mlab.com:61335/lismart'
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
  getToDonts() {
    return apiClient.get('/todonts')
  },
  putTodos(todos) {
    return apiClient.put('/todos/', todos)
  },
  deleteTodos() {
    return apiClient.delete('/todos/')
  },
  postTodos(todos) {
    return apiClient.post('/todos', todos)
  }
}
