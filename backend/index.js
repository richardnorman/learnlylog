/**
 * To use this server, make sure the frontend is built and all static files are located in ../frontend/build
 * 
 * To build the client 
 * $ cd ..
 * $ cd frontend
 * $ npm run build
 * 
 * Then navigate back here and run:
 * $ node index.js
 */

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('../frontend/build'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 