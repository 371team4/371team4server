const Slide = require('../models/slide/slide.model')
const Image = require('../models/image/image.model')
const User = require('../models/user/user.model')

// demo Slide array
const initialSlides = [
  {
    title: {
      content: 'first',
      fontColor: 'Blue',
      fontSize: 'Small',
      fontWeight: 'Normal',
      fontStyle: 'Italic'
    },
    description: {
      content: 'first Slide',
      fontColor: 'Red',
      fontSize: 'Large',
      fontWeight: 'Bold',
      fontStyle: 'Oblique'
    },
    date: {
      content: 'Wed 5 Feb 2015',
      fontColor: 'Green',
      fontSize: 'X-Small',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '02:05 AM',
      fontColor: 'Yellow',
      fontSize: 'XX-Small',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '20',
      repeatable: true,
      startDate: '2018-02-16',
      endDate: '2018-03-05'
    },
    images: ['5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef439', '5a98ad9a16608d51864ef43b']
  },
  {
    title: {
      content: 'Second',
      fontColor: 'Blue',
      fontSize: 'Smaller',
      fontWeight: 'Normal',
      fontStyle: 'Italic'
    },
    description: {
      content: 'second Slide',
      fontColor: 'Red',
      fontSize: 'Medium',
      fontWeight: 'Bold',
      fontStyle: 'Oblique'
    },
    date: {
      content: 'Mon 6 Mar 2016',
      fontColor: 'Green',
      fontSize: 'Larger',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '01:00 AM',
      fontColor: 'Yellow',
      fontSize: 'XX-Large',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '20',
      repeatable: true,
      startDate: '2018-02-16',
      endDate: '2018-03-05'
    },
    images: ['5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef439', '5a98ad9a16608d51864ef43b']
  },
  {
    title: {
      content: 'Third',
      fontColor: 'Blue',
      fontSize: 'X-Large',
      fontWeight: 'Normal',
      fontStyle: 'Italic'
    },
    description: {
      content: 'third Slide',
      fontColor: 'Red',
      fontSize: 'Large',
      fontWeight: 'Bold',
      fontStyle: 'Oblique'
    },
    date: {
      content: 'Fri 8 Apr 2017',
      fontColor: 'Green',
      fontSize: 'X-Small',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '23:05 AM',
      fontColor: 'Yellow',
      fontSize: 'XX-Small',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '20',
      repeatable: true,
      startDate: '2018-02-16',
      endDate: '2018-03-05'
    },
    images: ['5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef439', '5a98ad9a16608d51864ef43b']
  }
]

const initialImages = [
  {
    _id: '5a98ad9a16608d51864ef43b',
    name: 'androidparty.jpg',
    mimetype: 'image/jpeg',
    md5: '5cc6106614b3d9a3feb886e0fee9c25e',
    path: '/images/androidparty.jpg'
  },
  {
    _id: '5a98ad9a16608d51864ef439',
    name: 'glass.jpg',
    mimetype: 'image/png',
    md5: '1aff56d3ac29f45b6283917d3b5d3adb',
    path: '/images/glass.jpg'
  },
  {
    _id: '5a98ada216608d51864ef43c',
    name: 'google.jpg',
    mimetype: 'image/jpeg',
    md5: '7864df87770667b3d7e291a5f6642a14',
    path: '/images/google.jpg'
  }
]

const initialUsers = [
  {
    username: 'admin',
    password: 'admin'
  },
  {
    username: 'first',
    password: 'second'
  },{
    username: 'test',
    password: 'test'
  }
]

async function clearSlidesCollection () {
  // clear database
  await Slide.remove({}, () => {
    console.log('Slides Collection clean up was completed!')
  }).exec() // need .exec() to return a promise
}

async function seedSlidesCollection () {
  // seed the database
  await Slide.insertMany(initialSlides)
  console.log('Slide Collection initialization was completed!')
}

async function initSlidesCollection () {
  await clearSlidesCollection()
  await seedSlidesCollection()
}

async function clearImagesCollection () {
  // clear database
  await Image.remove({}, () => {
    console.log('Image Collection clean up was completed!')
  }).exec() // need .exec() to return a promise
}

async function seedImagesCollection () {
  // seed the database
  await Image.insertMany(initialImages)
  console.log('Image Collection initialization was completed!')
}

async function initImagesCollection () {
  await clearImagesCollection()
  await seedImagesCollection()
}

async function clearUsersCollection () {
  // clear database
  await User.remove({}, () => {
    console.log('User Collection clean up was completed!')
  }).exec() // need .exec() to return a promise
}

async function seedUsersCollection () {
  // seed the database
  await User.insertMany(initialUsers)
  console.log('User Collection initialization was completed!')
}

async function initUsersCollection () {
  await clearUsersCollection()
  await seedUsersCollection()
}

module.exports = {
  initSlidesCollection,
  seedSlidesCollection,
  clearSlidesCollection,
  initImagesCollection,
  seedImagesCollection,
  clearImagesCollection,
  initUsersCollection,
  seedUsersCollection,
  clearUsersCollection
}
