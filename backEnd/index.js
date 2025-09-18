const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors())

// importing route
const bookRouter = require('./route/bookRoute')

const mongooseConnection = require('./server')
// calling data base
mongooseConnection()

app.use(express.json());

// book router global routr
app.use('/book',bookRouter)
// simple route
app.get('/',(req,res)=>{
    res.send('hello express connected')
})

//set the port
const port = 4000
app.listen(port,()=>{console.log(`express server running on ${port}`);
})    

