const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./api/routes/user");
const adminRouter=require("./api/routes/admin");
const kudumbashreeRouter=require("./api/routes/kudumbashree");

//----------server database-------------
// mongoose
//   .connect(
//     "mongodb+srv://miniproject:" +
//       process.env.DB_PASSWORD +
//       "@cluster0.ecruf.mongodb.net/miniproject?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     }
//   )
//---------------local database--------------
mongoose
  .connect("mongodb://localhost:27017/miniproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log(
        "========database connected============"
      ); /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    },
    (err) => {
      console.log(err);
      console.log(
        "========database not connected=========="
      ); /** handle initial connection error */
    }
  );



app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/admin",adminRouter);
app.use("/kudumbashree",kudumbashreeRouter);

module.exports = app;
