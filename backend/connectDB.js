const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fs = require("fs");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // console.log(mongoose.mongo)

    // const gfs = await Grid(conn, mongoose.mongo);

    // var writeStream = gfs.createWriteStream({
    //   filename: "my_file.txt",
    // });

    // fs.createReadStream("/some/path").pipe(writeStream)

    // console.log(gfs)
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
