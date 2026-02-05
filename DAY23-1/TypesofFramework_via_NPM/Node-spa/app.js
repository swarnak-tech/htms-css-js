// Below are the stepos to set up a basic Express server in Node.js
// Step 1: Import the Express module
const express = require('express');
// Step 2: Create an instance of an Express application
const app = express();
// Step 3: Define a port number for the server to listen on
const PORT = process.env.PORT || 3000;
// Step 4: Set up a basic route to handle GET requests to the root URL
app.get('/', (req, res) => {    
    res.send('Hello, World!');
});
// creating another route
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});
//creating another route 
app.get('/contact', (req, res) => {
    res.send('This is the contact page.');
});
// creating a route with a parameter
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Hello, ${userName}!`);
});
// Step 5: Start the server and have it listen on the defined port
app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Step 6: Export the app for testing or further configuration
module.exports = app;
