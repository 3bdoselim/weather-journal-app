// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')

app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8001

const server = app.listen(port, () => {
    console.log(`server is running on lacalhost: ${port}`);
})

// Callback to debug
app.post('/addData', function (request, response) {
    let postedData = request.body
    let storedData = {
        date: postedData.date,
        temp: postedData.main.temp,
        content: postedData.content,
    }
    projectData = storedData
    console.log('posted data', projectData);
})

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/allData', function (request, response) {
    response.send(projectData)
})
// Post Route
