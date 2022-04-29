/* jslint esversion: 8 */
const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    topic: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    originDate: { type: Date, default: Date.now },
    
  });

   blogpostSchema.pre('save', async function(doc, next){
       console.log(doc.content);
    //     // send data to api to send mail to doctors.
    });
    
    
     blogpostSchema.post('save', async function(doc, next){
        console.log("The blogpost has been added to database", doc);
    });

const Blogpost = mongoose.model("blogpost", blogpostSchema);

module.exports = Blogpost;