<template>
  <div class="about">
    <!-- <font-awesome-icon
      icon="grip-lines"
      class="fas fa-grip-lines fa-lg handle"
      @click="edit"
    /> -->
    <h3>{{ section }}{{ cText }}</h3>
    <input type="" />
    <form @submit.prevent="onSubmit">
      <VueEditor
        v-model="content.text"
        :editor-toolbar="customToolbar"
        placeholder="cText"
      ></VueEditor>
    </form>
    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>
    <v-btn @click="processenv">process.env</v-btn>
    <!-- <v-btn @click="onSubmit">Submit</v-btn> -->
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import EventServiceAlt from '@/services/EventServiceAlt.js'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  props: {
    section: String,
    verbiage: String
  },
  data() {
    return {
      sec: this.section,
      content: {
        text: this.verbiage
      },
      customToolbar: [
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    }
  },
  computed: {
    cText() {
      return this.content.text + '   aaaaaaaa'
    }
  },
  methods: {
    onSubmit() {
      alert('edit')
      this.$emit()
    },
    processenv() {
      console.log(process.env.VUE_APP_DBUSER)
      console.log(process.env.VUE_APP_DBPASSWORD)
      console.log(process.env.VUE_APP_DBPASSWORDATLAS)
    },
    post() {
      // console.log(JSON.stringify(this.list, null, 2))

      //create new db called 'lx' use new Acosta dev-server
      var submittal = JSON.stringify(this.content)
      console.log(submittal)
      // fetch('http://localhost:3000' + '/api/user', {
      //   method: 'POST'
      // }).then(res => {
      //   // console.log(res)
      //   console.log(res.json())
      // })

      EventServiceAlt.postSnippet({
        text: submittal,
        text2: submittal + 'adsfasfd'
      }).then(response => {
        console.log(response.status)
      })
      // axios({
      //   method: 'post',
      //   data: {
      //     text: submittal
      //   },
      //   url: 'http://localhost:3000/snippets',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(() => {
      //   console.log('ss')
      // })

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
