var items = [
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
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            children: [
              {
                id: 8,
                num: null,
                name: 'index : ts :',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
              },
              {
                id: 9,
                num: null,
                name: 'bootstrap : ts : ',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
              }
            ]
          }
        ]
      }
    ]
  }
]

function items_with_numbering() {
  const result = []
  let lev1 = 0
  let lev2 = 0
  let lev3 = 0

  console.log(items.length)

  for (let i = 0; i < items.length; i++) {
    // use the for loop that uses an index
    // if (item.children) {
    // }
    lev1 += 1
    console.log('lev 1: ' + lev1)

    result.push({
      id: items[i].id,
      name: items[i].name,
      test: items[i].text,
      num: lev1
    })
    console.log(items[i].children)

    if (items[i].hasOwnProperty('children')) {
      console.log('hello from inside items i children')

      lev2 = 0
      //push onto nested array; do the same down to lev3
      for (let j = 0; j < Object.keys(items[i]).length; j++) {
        lev2 += 1
        console.log('lev 2: ' + lev2)

        if (items[i].children[j].children) {
          lev3 = 0

          for (let k = 0; i < items[i][j].length; k++) {
            lev3 += 1
            console.log('lev 3: ' + lev3)
          }
        }
      }
    }
  }
}
