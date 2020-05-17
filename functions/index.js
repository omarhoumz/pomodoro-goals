const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp()
} else {
  const serviceAccount = require('./fireb-adminsdk.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pomodoro-goals.firebaseio.com',
  })
}

const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions =
  process.env.NODE_ENV === 'production'
    ? {
        origin: 'https://pomodoro-goals.netlify.app',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    : { origin: true }

app.use(cors(corsOptions))

app.post('/createIssue', (req, res) => {
  const { label, estimation, starts } = JSON.parse(req.body)
  console.log({ label, estimation, starts })

  admin.firestore().collection('messages').add({ label, estimation, starts })

  res.json({
    status: 2000,
    message: 'issue created',
    issue: { label, estimation, starts },
  })
})

app.get('/', (req, res) =>
  res.json({
    message: 'hello from pomodoro',
    status: 2000,
  })
)

app.get('/name/:name', (req, res) =>
  res.json({
    message: `Hello, ${req.params.name}!`,
    status: 2000,
  })
)

app.get('/name', (req, res) =>
  res.json({
    message: `Hello!`,
    status: 2000,
  })
)

exports.helloWorld = functions.https.onRequest(app)
