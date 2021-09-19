const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
    title: String,
    topic: String,
    content: String,
    originDate: { type: Date, default: Date.now },
    
  });

   blogpostSchema.pre('save', async function(doc, next){
    //     // send data to api to send mail to doctors.
    });
    
    
     blogpostSchema.post('save', async function(doc, next){
        console.log("The user has been added to database", doc);
    });

const Blogpost = mongoose.model("blogpost", blogpostSchema);

module.exports = Blogpost;