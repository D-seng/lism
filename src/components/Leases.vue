/* eslint-disable vue/return-in-computed-property */
<template>
  <div>
    <h1>Leases</h1>
    <!-- <v-container>
      <v-layout column>
        <v-flex xs12>
     
          <draggable v-model="events" @start="drag = true" @end="drag = false">
            <v-card v-for="ls in events" :key="ls.id" @drop="renumber(ls)">
              {{ ls.title }}
            </v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>-->
    <v-btn outline block @click="runComp">button</v-btn>

    <!-- <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-expansion-panel"
      @start="drag = true"
      @end="drag = false"
      @ondrop="dropHandler"
    >
      <v-expansion-panel-content
        class="draggableitem"
        v-for="item in items"
        :key="item.id"
        width="100%"
      >
        <div slot="header">{{ item.name }}</div>

        <p>{{ item.text }}</p>
        <draggable
          v-model="item.children"
          @start="drag = true"
          @end="drag = false"
          dragClass="blueDrag"
        >
          <div v-for="child in item.children" :key="child.id">
            {{ child.name }} {{ child.text }}
            <draggable v-model="child.children" @start="drag = true" @end="drag = false">
              <div v-for="child2 in child.children" :key="child2.id">
                {{ child2.name }} {{ child2.text }}
                <draggable v-model="child2.children" @start="drag = true" @end="drag = false">
                  <div
                    v-for="child3 in child2.children"
                    :key="child3.id"
                  >{{ child3.name }} {{ child3.text }}</div>
                </draggable>
              </div>
            </draggable>
          </div>
        </draggable>
      </v-expansion-panel-content>
    </draggable>
    <v-divider></v-divider>
    
    <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-expansion-panel"
      @start="drag = true"
      @end="drag = false"
      @ondrop="dropHandler"
    >
      <v-expansion-panel-content
        class="draggableitem"
        v-for="item in items"
        :key="item.id"
        width="100%"
      >
        <div slot="header">{{ item.name }}</div>

        <p contenteditable="false">{{ item.text }}</p>
        <draggable
          v-model="item.children"
          @start="drag = true"
          @end="drag = false"
          :options="{ handle: '++' }"
        >
          <div v-for="child in item.children" :key="child.id">
            <p contenteditable="false">{{ child.name }} {{ child.text }}</p>
            <draggable
              v-model="child.children"
              @start="drag = true"
              @end="drag = false"
            >
              <div v-for="child2 in child.children" :key="child2.id">
                <p contenteditable="false">
                  {{ child2.name }} {{ child2.text }}
                </p>
                <draggable
                  v-model="child2.children"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div v-for="child3 in child2.children" :key="child3.id">
                    <p contenteditable="false">
                      {{ child3.name }} {{ child3.text }}
                    </p>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
        </draggable>
      </v-expansion-panel-content> </draggable
    >-->
    <!-- ********************************************* -->
    <!-- <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-expansion-panel"
      dragoverBubble="true"
      @start="drag = true"
      @end="drag = false"
      @drop="dropHandler()"
    >
      <v-expansion-panel-content
        class="draggableitem"
        v-for="item in items"
        :key="item.id"
        width="100%"
      >
        <div slot="header">{{ fullItemLevel1 }}. {{ item.name }}</div>

        <p contenteditable="false">{{ itemLevel1 }}.0 {{ item.text }}</p>
        <draggable
          v-model="item.children"
          @start="drag = true"
          @end="drag = false"
        >
          <div v-for="child in item.children" :key="child.id">
            <p contenteditable="false">
              {{ fullItemLevel2 }}{{ child.name }}
              {{ child.text }}
            </p>
            <draggable
              v-model="child.children"
              @start="drag = true"
              @end="drag = false"
            >
              <div v-for="child2 in child.children" :key="child2.id">
                <p contenteditable="false">
                  {{ fullItemLevel3 }}{{ child2.name }} {{ child2.text }}
                </p>
                <draggable
                  v-model="child2.children"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div v-for="child3 in child2.children" :key="child3.id">
                    <p contenteditable="false">
                      {{ child3.name }} {{ child3.text }}
                    </p>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
        </draggable>
      </v-expansion-panel-content>
    </draggable>-->
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      event: null,
      events: [],
      itemLevel1: 1,
      itemLevel2: 0,
      itemLevel3: 0,
      // create an array for rendering, a la https://codepen.io/anon/pen/ZwVJrg?editors=1010
      items: [
        {
          id: 1,
          num: null,
          name: 'Applications :',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          children: [
            {
              id: 2,
              num: null,
              name: 'Calendar',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
              id: 3,
              num: null,
              name: 'Chrome',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
              id: 4,
              num: null,
              name: 'Webstorm',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
          ]
        },
        {
          id: 5,
          num: null,
          name: 'Documents :',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          children: [
            {
              id: 6,
              num: null,
              name: 'vuetify : ',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              children: [
                {
                  id: 7,
                  num: null,
                  name: 'src :',
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  children: [
                    {
                      id: 8,
                      num: null,
                      name: 'index : ts :',
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                      id: 9,
                      num: null,
                      name: 'bootstrap : ts : ',
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    }
                  ]
                }
              ]
            },
            {
              id: 10,
              num: null,
              name: 'material2 :',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              children: [
                {
                  id: 11,
                  num: null,
                  name: 'src :',
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  children: [
                    {
                      id: 12,
                      num: null,
                      name: 'v-btn : ts',
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                      id: 13,
                      num: null,
                      name: 'v-card : ts',
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    },
                    {
                      id: 14,
                      num: null,
                      name: 'v-window : ts',
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 15,
          num: null,
          name: 'Downloads :',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          children: [
            {
              id: 16,
              num: null,
              name: 'October : pdf',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
              id: 17,
              num: null,
              name: 'November : pdf',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
              id: 18,
              num: null,
              name: 'Tutorial : html',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
          ]
        },
        {
          id: 19,
          num: null,
          name: 'Videos :',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          children: [
            {
              id: 20,
              num: null,
              name: 'Tutorials :',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              children: [
                {
                  id: 21,
                  num: null,
                  name: 'Basic layouts : mp4',
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },
                {
                  id: 22,
                  num: null,
                  name: 'Advanced techniques : mp4',
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                },
                {
                  id: 23,
                  num: null,
                  name: 'All about app : dir',
                  text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                }
              ]
            },
            {
              id: 24,
              num: null,
              name: 'Intro : mov',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            },
            {
              id: 25,
              num: null,
              name: 'Conference introduction : avi',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
          ]
        }
      ]
    }
  },
  methods: {
    renumber(ls) {
      console.log('renumber me' + ls.id)
    },
    dropHandler() {
      alert('dropHandler')
      console.log('dropHandler')
    },
    runComp() {
      console.log(this.items_with_numbering)
      // alert('runComps')
    }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    items_with_numbering() {
      const result = []
      let lev1 = 0
      let lev2 = 0
      let lev3 = 0

      console.log(this.items.length)

      for (let i = 0; i < this.items.length; i++) {
        // use the for loop that uses an index
        // if (item.children) {
        // }
        lev1 += lev1
        console.log('lev 1: ' + lev1)

        result.push({
          id: this.items[i].id,
          name: this.items[i].name,
          test: this.items[i].text,
          num: lev1
        })
        if (this.items[i].children) {
          lev2 = 0
          //push onto nested array; do the same down to lev3
          for (let j = 0; j < this.items[i].length; j++) {
            lev2 += lev2
            console.log('lev 2: ' + lev2)

            if (this.items[i].children[j].children) {
              lev3 = 0

              for (let k = 0; i < this.items[i][j].length; k++) {
                lev3 += lev3
                console.log('lev 3: ' + lev3)
              }
            }
          }
        }
      }

      //how do you refer to the set of child elements for element in an array?
    }
  },

  // fullItemLevel1: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel1++
  //   }
  // },
  // fullItemLevel2: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1 + '.' + this.itemLevel2
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel2++
  //   }
  // },
  // fullItemLevel3: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1 + '.' + this.itemLevel2 + '.' + this.itemLevel3
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel3++
  //   }
  created() {
    EventService.getEventsUnpaginated().then(response => {
      console.log(response.data)
      this.events = response.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p.blueDrag {
  color: green;
}
</style>
