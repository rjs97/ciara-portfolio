const functions = require('firebase-functions')
const express = require('express')
const fs = require('fs')
// const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
  .use(cors({ origin: true }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

const dirPath = path.join(__dirname, '/public/img/')

app.post('/email', async (req, res) => {
  const { name, email, subject, message } = req.body

  console.log('INFO: ', name, email, subject, message)

  // TODO: it literally works if you run firebase serve but it doesnt if you try to deploy
  // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'ciara.post.contact@gmail.com',
  //     pass: 'sfsux666'
  //   }
  // })
  //
  // var text = `<div>
  //     <h3>Information</h3>
  //     <ul>
  //       <li>
  //         Name - ${name}
  //       </li>
  //       <li>
  //         Email - ${email}
  //       </li>
  //       <li>
  //         Subject - ${subject}
  //       </li>
  //     </ul>
  //     <h4>Message</h4>
  //     <p>${message}</p>
  //   </div>`
  //
  // // send mail with defined transport object
  // const info = await transporter.sendMail({
  //   from: `${name} <${email}>`, // sender address
  //   to: 'athena2147@gmail.com', // TODO: switch this out for ciara's email
  //   subject: `${subject}`, // Subject line
  //   text: text, // plain text body
  //   html: text // html body
  // })
  //
  // console.log('Message sent: %s', info.messageId)

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
        return true
      } else { return false }
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

exports.api = functions.https.onRequest(app)
