const Slide = require('../models/slide/slide.model')
const Image = require('../models/image/image.model')
const User = require('../models/user/user.model')
const Week = require('../models/week/week.model')

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
      content: '2018-03-09',
      fontColor: 'Green',
      fontSize: 'X-Small',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '2015-02-09 02:05',
      fontColor: 'Yellow',
      fontSize: 'XX-Small',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '1',
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
      content: '2018-03-06',
      fontColor: 'Green',
      fontSize: 'Larger',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '2016-03-06 01:00',
      fontColor: 'Yellow',
      fontSize: 'XX-Large',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '3',
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
      content: '2018-03-02',
      fontColor: 'Green',
      fontSize: 'X-Small',
      fontWeight: 'Lighter',
      fontStyle: 'Normal'
    },
    time: {
      content: '2017-04-02 23:05',
      fontColor: 'Yellow',
      fontSize: 'XX-Small',
      fontWeight: 'Bolder',
      fontStyle: 'Normal'
    },
    meta: {
      template: 'DefaultSlideTemplate',
      timeout: '5',
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
    password: '$2a$13$LfUzP5HUbmWIqVXHcEH5L.h6bfmW7nW8aLpk0IL809ee907UpIlqq', //admin001
    email: 'email@email.com'
  },
  {
    username: 'first',
    password: '$2a$13$KZlokgIgetcX6LT8DDTvDuZ/aJVS0KmguXZruntXaJmYH5.GE3Fre', //admin001
    email: 'email@email.com'
  },
  {
    username: 'test',
    password: '$2a$13$DGSRoyvSy1QgT6q5BwmL1.9omsExIoDowsMkSP3PVIbfppuS0ux1C', //admin001
    email: 'email@email.com'
  }
]

const initialWeeks = [
  {
    days: [
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Monday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Tuesday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Wednesday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Thursday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Friday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Saturday'
      },
      {
        meals: {
          lunch: ['asdfasdfasdf', 'asdfsdaf'],
          supper: ['asdfasdf']
        },
        name: 'Sunday'
      }
    ],
    _id: '5abb0c2a45876f4d8ebc542a',
    startDate: '2012-04-23T18:25:43.511Z'
  },
  {
    days: [
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Monday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Tuesday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Wednesday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Thursday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Friday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Saturday'
      },
      {
        meals: {
          lunch: [],
          supper: []
        },
        name: 'Sunday'
      }
    ],
    _id: '5abb0c0f45876f4d8ebc5423',
    startDate: '2012-04-23T18:25:43.511Z'
  }
]

async function clearSlidesCollection () {
  // clear database
  await Slide.remove({}, err => {
    /* istanbul ignore next: cannot test database errors */
    if (err) {
      console.log('Failed to clear Slides collection -> ', err)
    }
  }).exec() // need .exec() to return a promise
}

async function seedSlidesCollection () {
  // seed the database
  try {
    await Slide.insertMany(initialSlides)
  } catch (err) {
    /* istanbul ignore next: cannot test database errors */
    console.log('Failed to initialize Slides collection -> ', err)
  }
}

async function initSlidesCollection () {
  await clearSlidesCollection()
  await seedSlidesCollection()
}

async function clearImagesCollection () {
  // clear database
  await Image.remove({}, err => {
    /* istanbul ignore next: cannot test database errors */
    if (err) {
      console.log('Failed to clear Images collection -> ', err)
    }
  }).exec() // need .exec() to return a promise
}

async function seedImagesCollection () {
  // seed the database
  try {
    await Image.insertMany(initialImages)
  } catch (err) {
    /* istanbul ignore next: cannot test database errors */
    console.log('Failed to initialize Images collection -> ', err)
  }
}

async function initImagesCollection () {
  await clearImagesCollection()
  await seedImagesCollection()
}

async function clearUsersCollection () {
  // clear database
  await User.remove({}, err => {
    /* istanbul ignore next: cannot test database errors */
    if (err) {
      console.log('Failed to clear Users collection -> ', err)
    }
  }).exec() // need .exec() to return a promise
}

async function seedUsersCollection () {
  // seed the database
  try {
    await User.insertMany(initialUsers)
  } catch (err) {
    /* istanbul ignore next: cannot test database errors */
    console.log('Failed to initialize Users collection -> ', err)
  }
}

async function initUsersCollection () {
  await clearUsersCollection()
  await seedUsersCollection()
}

async function clearWeeksCollection () {
  // clear database
  await Week.remove({}, err => {
    /* istanbul ignore next: cannot test database errors */
    if (err) {
      console.log('Failed to clear Weeks collection -> ', err)
    }
  }).exec() // need .exec() to return a promise
}

async function seedWeeksCollection () {
  // seed the database
  try {
    await Week.insertMany(initialWeeks)
  } catch (err) {
    /* istanbul ignore next: cannot test database errors */
    console.log('Failed to initialize Weeks collection -> ', err)
  }
}

async function initWeeksCollection () {
  await clearWeeksCollection()
  await seedWeeksCollection()
}

module.exports = {
  initialSlides,
  initialImages,
  initialUsers,
  initialWeeks,
  initSlidesCollection,
  seedSlidesCollection,
  clearSlidesCollection,
  initImagesCollection,
  seedImagesCollection,
  clearImagesCollection,
  initUsersCollection,
  seedUsersCollection,
  clearUsersCollection,
  initWeeksCollection,
  seedWeeksCollection,
  clearWeeksCollection
}
