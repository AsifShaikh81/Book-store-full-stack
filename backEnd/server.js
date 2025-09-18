// const express = require('express')
const mongoose = require("mongoose");

const url =
  "mongodb+srv://shaikhasif78866_db_user:VSIRbNRId0SQoNOE@crud-app.mtllney.mongodb.net/book-store";
const mongooseConnection = () => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("db connected succesfully");
    })
    .catch((error) => {
      console.log("db connection failed", error);
    });
};
//db pass = VSIRbNRId0SQoNOE
// db username = shaikhasif78866_db_user

module.exports = mongooseConnection;
