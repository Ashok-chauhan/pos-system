require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/pos-system", {
//   useNewUrlParser: true,
//   //useCreateIndex: true,
// });

mongoose
  .connect(process.env.DBConnection, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    //useFindAndModify: false,
  })
  .then(console.log("Database connected!"))
  .catch((err) => console.log(`error >>: ${err}`));
module.exports = mongoose;
