require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/pos-system", {
//   useNewUrlParser: true,
//   //useCreateIndex: true,
// });

mongoose.connect(process.env.DBConnection, {
  useNewUrlParser: true,
  //useFindAndModify: false,
});
module.exports = mongoose;
