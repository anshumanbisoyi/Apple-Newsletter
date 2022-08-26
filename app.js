const express=require("express");
const bodyParser=require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


//Setting up MailChimp
mailchimp.setConfig({
//API KEY
 apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx-usXX",
//API KEY PREFIX (THE SERVER)
  server: "usXX"
})


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName= req.body.firstname;
  const lastName= req.body.lastname;
  const email= req.body.email;

  const data={
    members: [{
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
        }
      }]
  };
  const jsonData= JSON.stringify(data);
 const url="https://usXX.api.mailchimp.com/3.0/lists/xxxxxxx";
  //const url="https://us18.api.mailchimp.com/3.0/lists/cc23ddbcf3/members?skip_merge_validation=false"
  const options={
    method:"POST",
    auth:"anshumanbisoyi:xxxxxxxxxxxxxxxxxxxxxxxxxx-usXX"
  }

const request=https.request(url,options, function(response){
// if(error){
//   res.send("There was an error with signing up, please try again later.");
// } else {
  if(response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }
//}
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){ //to route the screen to the desired page
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){ //process.env.PORT to let heroku host whereever it wants or locally host at 3000
  console.log("Server working on port 3000");
});

// api key
//use onwer api key not client

//unique id
//xxxxxxx
