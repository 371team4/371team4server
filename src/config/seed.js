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
    password: '$2a$13$LfUzP5HUbmWIqVXHcEH5L.h6bfmW7nW8aLpk0IL809ee907UpIlqq', //admin001
    email: 'email@email.com',
    role: 'admin'
  },
  {
    username: 'first',
    password: '$2a$13$KZlokgIgetcX6LT8DDTvDuZ/aJVS0KmguXZruntXaJmYH5.GE3Fre', //admin001
    email: 'email@email.com',
    role: 'staff'
  },
  {
    username: 'test',
    password: '$2a$13$DGSRoyvSy1QgT6q5BwmL1.9omsExIoDowsMkSP3PVIbfppuS0ux1C', //admin001
    email: 'email@email.com',
    role: 'staff'
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

module.exports = {
  initialSlides,
  initialImages,
  initialUsers,
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
