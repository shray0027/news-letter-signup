const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }

    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/d52b0f3f85";
  const options = {
    method: "POST",
    auth: "Shray:95c45fd14d1f877eb8739e8572fae81b-us2"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.listen(process.env.PORT || 3000, function() {
  console.log("server 3000 just started");
});



//api key
//95c45fd14d1f877eb8739e8572fae81b-us2


//list id
//d52b0f3f85
