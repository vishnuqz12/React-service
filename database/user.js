const MongoClient = require("mongodb").MongoClient;

//enter your database id and password
const url  = "mongodb://localhost:27017/bikeserviceDB";
const sendEmail = require("./../utils/mail");

module.exports={
   
    Register(userdetail){
        return new Promise (function(resolve,reject){
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");
                collection.findOne({phoneNumber: userdetail.phoneNumber}).then((data)=>{
                   
                    if( data == null || data.phoneNumber != userdetail.phoneNumber) {
                        collection.insertOne(userdetail).then(function(user){
                            resolve("Your booking is successfully registered");
                        }).catch(function(err){
                            reject("Error: Unable to create account at this moment: ${err}");
                        });  
                    } 
                    else {
                        resolve("This Phone number is already used. Please use a different phone number while registering");   
                    }
                }).catch(function(err) {
                    console.log("nodoc", err);
                    reject("Unable to register account please try again");
                });
                
            });
        });
    },

    bookAservice(user,servicebook){
        return new Promise(function(resolve,reject){
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true}, async function(err,connection){
                if(err){
                    console.log("error of booking");
                    reject(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");

                let existingMetaData = [];
               
                await collection.find({"phoneNumber": user.phoneNumber}).forEach((doc, index)=>{
           
                    existingMetaData = doc.bookings;
    
                });
                user.bookingID = user.name + ":"+new Date().getTime();
                
                let combinedArr = [...existingMetaData, user];
                servicebook = {
                    "$set": {"bookings": combinedArr}
                };
                let options = {
                    returnOriginal: true
                };
           
                await collection.findOneAndUpdate({"phoneNumber": user.phoneNumber}, servicebook).then((updateResponse)=> {
                  
                    sendEmail(updateResponse.value.to, `Your BookingID is ${user.bookingID}`, "Thanks for booking with us. ");
                    resolve(user.bookingID);

                }).catch((err)=>{
                    console.log("emaiiilllll errrorrrr"+err);
                });
            });
        });
    },


    serviceView(previous){
        return new Promise ((resolve,reject)=>{
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");

                collection.findOne(previous).then((reads)=>{
           
                    resolve(reads);
                }).catch(function(err){
                    reject(err);
                });
            });
        });
    },


    viewStatusByBookingID(userPhoneNumber, bookingID){
        return new Promise ((resolve,reject)=>{
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Monogodb= connection.db("bikeserviceDB");
                var collection = Monogodb.collection("bikeservice");
                collection.findOne({phoneNumber:userPhoneNumber}).then((userDocument)=>{
                
                    let bookings = userDocument.bookings;
                 
                    bookings.forEach(function(x, index){
                        if(x.bookingID == bookingID) {
                            resolve(x);
                        }
                    });
                    
                }).catch((err)=>{
                    reject(err);
                });
            });
        });
    }
}