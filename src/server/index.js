const express = require("express");
const os = require("os");
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

const sendEmails = (toEmails, subject, content, html) => {
  let credentials = {
    user: "devpython.dat@gmail.com",
    pass: "dat182980",
    to: toEmails
  };
  var send = require("gmail-send")({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    // from:    credentials.user,            // from: by default equals to user
    // replyTo: credentials.user,            // replyTo: by default undefined
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject: subject,
    text: content,
    html: html
  });
  console.log("* [example 1.1] sending test email");
  send(function(err, res) {
    if (err) console.log(err);
    else console.log(res);
  });
};
app.post('/api/sendEmails', jsonParser, function (req, res) {
  console.log(req.body);
  res.send('ok'+req.body.user);
  sendEmails(req.body.emailList, 'hello Im chatbot', 'abc', '<h1>helloWorld</h1>')
})
app.listen(8080, () => console.log("Listening on port 8080!"));
//sendEmails('mikelhpdatke@gmail.com', 'hello ais', 'abc', '<h1>helloWorld</h1>')