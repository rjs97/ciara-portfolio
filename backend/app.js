const express = require('express')
// const { check, validationResult } = require('express-validator')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')

var app = express()
const port = 8888
app.use(express.static(path.join(__dirname, '/public')))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

const dirPath = path.join(__dirname, '/public/img/')

app.set('view engine', 'html')

app.post('/email', async (req, res) => {
  const { name, email, subject, message } = req.body
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${name} <${email}>`, // sender address
    to: 'ciara@email.com', // list of receivers
    subject: `${subject}`, // Subject line
    text: `${message}`, // plain text body
    html: `<p>${message}</p>` // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.send('OK')
})

app.get('/files', (req, res) => {
  const filePath = req.query.path
  fs.readdir(path.join(dirPath, filePath), (err, files) => {
    if (err) {
      console.log('err: ', err)
      return
    }
    const toSend = files.filter((file) => {
      const fileType = file.split('.').pop()
      if (fileType === 'jpg') {
        return file
      }
    }).sort((a, b) => {
      return a.replace(/\D/g, '') - b.replace(/\D/g, '')
    })
    res.send({ files: toSend })
  })
})

app.post('/add', (req, res) => {
  console.log('body: ', req.body)
  fs.readFile('data.json', function (err, data) {
    if (err) throw err
    const json = JSON.parse(data)
    json.push(req.body)

    fs.writeFile('data.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err
    })
    res.send('OK')
  })
})

app.get('/titles', (req, res) => {
  // const filePath = req.query.path
  fs.readFile('data.json', (err, data) => {
    if (err) throw err
    const portfolio = JSON.parse(data)
    // const toSend = portfolio.filter((img) => (
    //   img.src.startsWith(filePath)
    // ))
    res.send(portfolio)
  })
})

app.listen(port, () => console.log('listening on port 8888'))
