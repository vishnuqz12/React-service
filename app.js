const express = require("express");
const app = express();
const dbclient = require('./database/user');
const dbservice = require('./database/owner');
const bodyParser = require('body-parser');
const path = require('path');



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json(true));
app.use(express.static('public'));


global._listOfServices = ["waterwash", "generalservice", "oilchange"];



app.post('/editservices', function(req, res){
    //add a new service to the globalist

    global._listOfServices.push(req.query.serviceType);
    //console.log(global._listOfServices);
    return res.send(global._listOfServices);
});


app.post('/customer/register',(req,res)=>{
    var reg = {
        "name":req.body.name,
        "email":req.body.email,
        "phoneNumber":req.body.phoneNumber,
        "bookings":[]
    };
   // console.log(req.body.phoneNumber);
    if(!req.body.phoneNumber || req.body.phoneNumber === "" || typeof(req.body.phoneNumber) === "undefined") {
        return res.send("Error: Please provide a valid phone Number");
    } else {
        dbclient.Register(reg).then(function(data){
            //console.log(data);
            res.send(data);
        }).catch(function(err){
            console.log(err);
        });
    }
});


app.post('/customer/bookaservice',function(req,res){
     
    let Servicedetails = req.body.ServiceType;
       if(!global._listOfServices.includes(Servicedetails)){
        return res.send("This type of service is not available.");
    }

    let sample = {
        "name":req.body.name,
        "phoneNumber": req.body.phoneNumber,
        "BikeModel": req.body.BikeModel,
        "BikeNumber": req.body.BikeNumber,
        "ServiceType": Servicedetails,
        "Date": req.body.Date  
    };
     
    let update = {
           $set : {"bookings": [{"BikeModel": "RE"}]}
    };
    dbclient.bookAservice(sample,update).then(function(bikedetails){
        
        res.send("Your Service is booked and your ID is " + bikedetails);
    }).catch(function(err){
        console.log(err);
    });
});


app.get('/customer/allbookings/',function(req,res){
    let Number = {
        "phoneNumber": req.query.phoneNumber
    };
    dbclient.serviceView(Number).then(function(user){
        res.send(user.bookings);
        //console.log(user.bookings);
    }).catch(function(err){
        console.log(err);
    });
});


app.get('/customer/statusBybookingID',function(req,res){
    var bookingStatus = {
        "phoneNumber": req.query.phoneNumber
    };
    dbclient.viewStatusByBookingID(req.query.phoneNumber, req.query.bookingID).then(function(bookingStatus){
    
        res.send(bookingStatus);
    }).catch(function(err){
        console.log(err);
    });
});

app.put("/serviceowner/updatecustomerstatus",function(req,res){

    dbservice.updateCustomerStatus(req.query).then(function(Changestatus){
       // console.log(Changestatus);
        res.send(Changestatus);
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/serviceowner/viewbookingdetails",function(req,res){
    dbservice.bookDetailsView(req.query.phoneNumber).then(function(bookingdetails){
        res.send(bookingdetails);
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/serviceowner/listallcustomers",function(req,res){
    dbservice.viewdata().catch(function(user){
        //console.log(user);
        res.send(user);
    }).catch(function(err){
        console.log(err);
    });
});

app.post("/serviceowner/createservice",function(req,res){
    //console.log(req.query.services);
    dbservice.createTypeOfservices(req.query.services).then(function(details){
        res.send(details);
    }).catch(function(err){
        console.log(err);
    });
});

app.post("/serviceowner/deletingservice",function(req,res){
    dbservice.deleteAservice(req.query.services).then(function(remove){
        res.send(remove);
    }).catch(function(err){
        console.log(err);
        
    });
});

app.post('/serviceowner/editservice',function(req,res){
    dbservice.editAservice(req.query.oldServiceName, req.query.newServiceName).then(function(edit){
        //console.log(edit);
        res.send(edit);
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/serviceowner/viewstatus',function(req,res){
    let findfillter = {bookings:{"$elemMatch":{status:"pending"}}};
    let projection = {"status": 1, "bookingID": 1};
    dbservice.viewStatusonly(findfillter,projection).then(function(status){
        //console.log(status);
        res.send(status);
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/serviceowner/showallbookings', function(req, res){

    dbservice.listAllBookings().then((data)=> {
        res.send(data)
    }).catch((err)=> {
        res.send(err)
    })
    //res.send('hi');
});

app.get('/helloworld', function(req, res) {
    res.json({
        'name': 'vishnu'
    });
})

let port = process.env.PORT ||5000
console.log(port);

if (process.env.NODE_ENV === 'production') {
    console.log('coming to react log');
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, function(){
    console.log('Express server running on port'+port);
});