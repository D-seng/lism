import axios from 'axios'

var src = 'mongodb'
var url
var dbPath

if (src === 'mongodb') {
  url = `http://localhost:5000/api/posts`
  dbPath = '/5c8525bda12257857384470d'
} else {
  url = `http://localhost/3000`
  dbPath = '/todos'
}

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/posts',
  // baseURL: `http://localhost:3000`,
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
    return apiClient.get('/5c8525bda12257857384470d')
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
