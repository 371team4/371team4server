const Slide = require("../slide/slide.model");

// demo Slide array
const initialSlides = [
  {
    title: {
      content: "first",
      fontColor: "Blue",
      fontSize: "Small",
      fontWeight: "Normal",
      fontStyle: "Italic"
    },
    description: {
      content: "first Slide",
      fontColor: "Red",
      fontSize: "Large",
      fontWeight: "Bold",
      fontStyle: "Oblique"
    },
    date: {
      content: "Wed 5 Feb 2015",
      fontColor: "Green",
      fontSize: "X-Small",
      fontWeight: "Lighter",
      fontStyle: "Normal"
    },
    time: {
      content: "02:05 AM",
      fontColor: "Yellow",
      fontSize: "XX-Small",
      fontWeight: "Bolder",
      fontStyle: "Normal"
    },
    meta: {
      template: "DefaultSlideTemplate",
      timeout: "20",
      repeatable: true,
      startDate: "2018-02-16",
      endDate: "2018-03-05"
    },
    images: [
      {
        src: "/images/google.jpg"
      },
      {
        src: "/images/androidparty.jpg"
      },
      {
        src: "/images/glass.jpg"
      }
    ]
  },
  {
    title: {
      content: "Second",
      fontColor: "Blue",
      fontSize: "Smaller",
      fontWeight: "Normal",
      fontStyle: "Italic"
    },
    description: {
      content: "second Slide",
      fontColor: "Red",
      fontSize: "Medium",
      fontWeight: "Bold",
      fontStyle: "Oblique"
    },
    date: {
      content: "Mon 6 Mar 2016",
      fontColor: "Green",
      fontSize: "Larger",
      fontWeight: "Lighter",
      fontStyle: "Normal"
    },
    time: {
      content: "01:00 AM",
      fontColor: "Yellow",
      fontSize: "XX-Large",
      fontWeight: "Bolder",
      fontStyle: "Normal"
    },
    meta: {
      template: "DefaultSlideTemplate",
      timeout: "20",
      repeatable: true,
      startDate: "2018-02-16",
      endDate: "2018-03-05"
    },
    images: [
      {
        src: "/images/google.jpg"
      },
      {
        src: "/images/androidparty.jpg"
      },
      {
        src: "/images/glass.jpg"
      }
    ]
  },
  {
    title: {
      content: "Third",
      fontColor: "Blue",
      fontSize: "X-Large",
      fontWeight: "Normal",
      fontStyle: "Italic"
    },
    description: {
      content: "third Slide",
      fontColor: "Red",
      fontSize: "Large",
      fontWeight: "Bold",
      fontStyle: "Oblique"
    },
    date: {
      content: "Fri 8 Apr 2017",
      fontColor: "Green",
      fontSize: "X-Small",
      fontWeight: "Lighter",
      fontStyle: "Normal"
    },
    time: {
      content: "23:05 AM",
      fontColor: "Yellow",
      fontSize: "XX-Small",
      fontWeight: "Bolder",
      fontStyle: "Normal"
    },
    meta: {
      template: "DefaultSlideTemplate",
      timeout: "20",
      repeatable: true,
      startDate: "2018-02-16",
      endDate: "2018-03-05"
    },
    images: [
      {
        src: "/images/google.jpg"
      },
      {
        src: "/images/androidparty.jpg"
      },
      {
        src: "/images/glass.jpg"
      }
    ]
  }
];

function clearSlidesCollection() {
  // clear database
  return Slide.remove({}, () => {
    console.log("Collection clean up was completed!");
  }).exec();// need .exec() to return a promise 
}

function seedSlidesCollection() {
  // seed the database
  return Slide.insertMany(initialSlides, () => {
    console.log("Collection initialization was completed!");
  });
}

function initSlidesCollection() {
  return clearSlidesCollection().then(() => {
    return seedSlidesCollection();
  });
}

module.exports = {
  initSlidesCollection,
  seedSlidesCollection,
  clearSlidesCollection
};
