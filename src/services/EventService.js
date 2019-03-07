import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
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
    return apiClient.get('/todos')
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
