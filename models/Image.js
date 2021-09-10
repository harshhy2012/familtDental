const mongoose = require("mongoose");
const { isURL } = require("validator");

const imageSchema = new mongoose.Schema({
    link: {
        type: String,
        validate: [isURL, 'Enter a valid link!']
    },
    desc: String,
  });


const Image = mongoose.model("image", imageSchema);

module.exports = Image;