const express = require("express");
const os = require("os");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

const sendEmails = async (toEmails, subject, content, html) => {
  let credentials = {
    user: "devpython.dat@gmail.com",
    pass: "dat182980",
    to: toEmails
  };
  let result = false;
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
  return new Promise((resolve, reject) => {
    send({}, function(err, res) {
      console.log(
        "* [example 1.1] send() callback returned: err:",
        err,
        "; res:",
        res
      );
      if (err) {
        reject("err");
      } else {
        console.log("tr");
        resolve("ok");
      }
    });
  });
};
app.post("/api/sendEmails", jsonParser, function(req, res) {
  console.log(req.body);

  htmlContent = req.body.askAns
    .map(content => {
      return `<h2>${content.ask}</h2><p>${content.ans}</p><br/>`;
    })
    .join("");
  console.log(htmlContent);
  let newArrEmail = [];
  for (let i = 0; i < req.body.emailList.length; i++)
    newArrEmail.push(req.body.emailList[i].Email);
  console.log(newArrEmail);
  sendEmails(newArrEmail, "Cập nhật câu trả lời cho sinh viên", "etc.", htmlContent)
    .then(ans => {
      res.status(200);
      console.log(ans);
      res.send({ status: "ok" });
    })
    .catch(err => {
      res.status(400);
      console.log("error in sendEmail");
      console.log(err);
      res.send({ status: "err" });
    });
});
app.listen(8080, () => console.log("Listening on port 8080!"));
//sendEmails('mikelhpdatke@gmail.com', 'hello ais', 'abc', '<h1>helloWorld</h1>')
