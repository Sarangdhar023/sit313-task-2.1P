
const javascript = require('body-parser');

const reveal = require('express');
const index = reveal();


var code_api = 'key-16b7db209e23dbfaa47c168b5737118f';
var domain = 'sandbox9d7ca6e5813c4f458649523ba189d722.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: code_api, domain: domain});
 
var statics = {
  from: ' From Sarangdhar <sarangdhar4837.be22@chitkara.edu.in>',
  to: 'sarangdhar4837.be22@chitkara.edu.in',
  subject: 'Sarangdhar web server',
  text: 'i am sarangdhar and i am checking my first Mailgum'
};
 

index.use(javascript .urlencoded({extended:true}))
index.use(reveal.static("public"));
index.get("/",function(req,res){  
    res.sendFile(__dirname+"/index.html")
})

index.listen(5050, function(req, rev) 
{
    console.log('your server is in progress on 5050');
});
index.post('/',function(req,res){
    
    const email= req.body.email;
    console.log(req.body);
    mailgun.messages().send(statics, function (error, body) {
        if(error)
        {
            console.log(error);
        }
      console.log(body);
    });
});