const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
    title: String,
    topic: String,
    originDate: { type: Date, default: Date.now },
    content: String,
  });

  // const blogpost = new Blogpost({
  //   title: req.body.postTitle,
  //   topic: req.body.postTopic,
  //   content: req.body.postBody,
  // });
  // blogpost.save(function (err) {
  //   if (!err) {
  //     res.redirect("/");
  //   }
  // });


const Blogpost = mongoose.model("blogpost", blogpostSchema);

module.exports = Blogpost;