const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')

var rollbar = new Rollbar({
  accessToken: '383be7d16eb84a758f1ec8247e0d820e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'))
   rollbar.info("html file served succesfully")
});

app.post('/api/student', (req, res) => {
   let {name} = req.body
   name - name.trim()

   students.push(name)

   rollbar.log('student added successfully', {author: "Daniel", type: 'Manual entry'})
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`We're going to the future! Year ${port}`))