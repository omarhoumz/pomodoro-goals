const functions = require('firebase-functions')

const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions =
  process.env.NODE_ENV === 'production'
    ? {
        origin: 'https://pomodoro-goals.netlify.app/',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    : { origin: true }

app.use(cors(corsOptions))

app.get('/', (req, res) =>
  res.json({
    message: 'hello from pomodoro',
    status: 200,
  })
)

app.get('/name/:name', (req, res) =>
  res.json({
    message: `Hello, ${req.params.name}!`,
    status: 200,
  })
)

app.get('/name', (req, res) =>
  res.json({
    message: `Hello!`,
    status: 200,
  })
)

exports.helloWorld = functions.https.onRequest(app)
