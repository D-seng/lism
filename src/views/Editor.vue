<template>
  <div class="about">
             <font-awesome-icon
            icon="grip-lines"     
            class="fas fa-grip-lines fa-lg handle"
            @click="edit"
          />
    <h1>Edit</h1>


    <vue-editor v-model="content.text" 
    :editor-toolbar="customToolbar"></vue-editor>

    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>
    <v-btn @click="save">save</v-btn>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: {
        text: 'write here...'
      },
      customToolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], ["bold", "italic"], 
      [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
      [{list: "ordered"}, {list: "bullet"}]]
    }
  },
  methods: {
    edit() {
      alert('edit')
    },
    save() {
      console.log(this.content)
    },
    post() {
      // console.log(JSON.stringify(this.list, null, 2))
      var submittal = JSON.stringify(this.content)
      console.log(submittal)
      EventService.postTodos(submittal).then(response => {
        console.log(response.status)
      })

      // console.log(this.content)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/api/posts',
      //   data: this.content
      // })
    },
    postX() {
      console.log(this.content)
    },
    put() {
      var posts = JSON.stringify(this.lease, null, 2)
      console.log(posts)
      EventService.putPosts(posts, this.id).then(response => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    }
  }
}
</script>
