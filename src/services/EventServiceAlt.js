import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getSnippets() {
    return apiClient.get('/snippets')
  },

  getSnippet(id) {
    return apiClient.get('/snippets/' + id)
  },

  postSnippet(snippet) {
    return apiClient.post('/snippets', snippet)
  },

  putSnippet(snippet, id) {
    return apiClient.put('/' + id, snippet)
  }
}
