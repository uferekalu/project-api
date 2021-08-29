const express = require('express')
const app = express()
const connectDB = require('./config/db.js') // DB connection
const cors = require('cors') // includes cors module
const bodyParser = require("body-parser");
const projects = require("./routes/api/project");

require('dotenv').config()

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well

connectDB() //this function connects us to the DB!!!
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Database connected'))

app.use("/api", projects);

app.listen(process.env.PORT, () => {
    console.log(`The API is running on port ${process.env.PORT}`)
})