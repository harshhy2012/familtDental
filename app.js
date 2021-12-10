require("dotenv").config();
// const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const _ = require("lodash");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mainRoutes = require("./routes/mainRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const stopCache = require("./middleware/stopCacheMiddleware");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

const dbURI = "mongodb+srv://harshhy2012:" +
              process.env.db_pw +
              "@cluster0.kujzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI,
                 {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
                 .then(result => app.listen(process.env.PORT || 3000, () => {console.log("Server is running at port 3000");}))
                 .catch(err => console.log(err));

app.use(mainRoutes);
app.use(adminRoutes);
app.use('/admin', requireAuth , stopCache, authRoutes);

