const  MongoClient = require("mongodb").MongoClient;

//enter your database id and password
const url  = "mongodb://localhost:27017/bikeserviceDB";
const sendEmail = require("./../utils/mail");

module.exports = {

    

    updateCustomerStatus(currentStatus,updateStatus){
        return new Promise (function(resolve,reject) {
           
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
                if(err) {
                    console.log("error of connection");
                    reject(err);
                }
             
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");

                collection.findOne({phoneNumber:currentStatus.phoneNumber}).then((resultDoc)=>{
                    if(resultDoc){
                   
                        const updateBookings= resultDoc.bookings;
                        updateBookings.forEach(function(x,index){
                            let key= "bookings."+index+".status";
                            let obj= {};
                            obj[key]= currentStatus.status;
                            updateStatus = {
                                $set: obj
                            }
                            if(x.bookingID == currentStatus.bookingID){
                                collection.updateOne({phoneNumber:currentStatus.phoneNumber},updateStatus).
                            then(function(changeStatus){
                                if(changeStatus.modifiedCount==1){
                                   
                                    if(currentStatus.status === 'readyfordelivery'){
                                         sendEmail(resultDoc.email, `your BookingID ${currentStatus.bookingID} is Readyfordelivery` , 'Come and take your bike');
                                    }

                                resolve("successfully update the data"+currentStatus.bookingID);
                                }
                            }).catch((err)=>{
                                reject(err);
                            });
                        }
                    });
                }
            }).catch((err)=>{
                reject(err);
            });
        })
    });
   },


   bookDetailsView(ByPhNo){
       return new Promise ((resolve,reject)=>{
           MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,conncetion)=>{
               if(err) {
                   console.log("error");
                   reject(err);
               }
               var Mongodb =conncetion.db("bikeserviceDB");
               var collection = Mongodb.collection("bikeservice");
               collection.findOne({phoneNumber:ByPhNo}).then((details)=>{
                   resolve(details);
               }).catch((err)=>{
                   reject(err);
               });
           });
       });
   },

   createTypeOfservices(newservicename){
       console.log(newservicename);
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
            if(err){
                console.log("errroorrr");
                reject(err);
            }
            var Mongodb = connection.db("bikeserviceDB");
            var collection = Mongodb.collection("bikeservice");
           // let key = services.typeofservice;
           let updateOperation = {
               $push: {"services": newservicename}
           };
           collection.updateOne({name:"offeringservices"}, updateOperation).then((updateResult)=>{
                 // console.log(updateResult);
                  if(updateResult.modifiedCount > 0) {
                   resolve("Added the new service to the database");
                 } else {
                   reject("Unable to add the service to the database");
                 }
              
                }).catch((err)=>{
               console.log(err);
                });
             });
        });
    },



    deleteAservice(deletingOperation){
        return new Promise ((resolve,reject)=>{
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true },(err,connection)=>{
                if(err){
                    reject(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");
                let remove = {
                    $pull : {services:{$in:[deletingOperation]}}
                };
                collection.updateOne({name:"offeringservices"},remove).then(function(removeElement){
                  
                    resolve('Remove the service to the databaseg',removeElement);
                }).catch(function(err){
                    reject('unable to remove the service to the batabase');
                });
            });
        });
    },

    editAservice(oldServiceName, newServiceName){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true },(err,connection)=>{
                if(err){
                    console.log(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeserviceDB");
                
                let editOptions = {
                    '$set': {'services.$[eq:waterwash]': newServiceName}
                };
                collection.updateOne({'name':'offeringservices'}, editOptions).then((updatedResult)=>{
                    console.log(updatedResult);
                }).catch((err)=>{
                    console.log(err);
                });
            });
        });
    },

    listAllStatus(fillter,projection){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url,{  useUnifiedTopology: true ,useNewUrlParser: true},(err,connection)=>{
                if(err){
                    reject(err);

                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");
                
                let view = collection.find(fillter,{s});
                
                resolve(view.toArray());
            });
        });
    },

    listAllBookings(){
        return new Promise(function(resolve, reject){
            MongoClient.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},(err, connection)=> {
                if(err) {
                    reject(err);
                }
                var Mongodb = connection.db("bikeserviceDB");
                var collection = Mongodb.collection("bikeservice");

               collection.find({}, (err, userDoc)=>{
                   var userdocs = [];
                   userDoc.forEach((doc)=>{
                    //console.log(doc);
                    userdocs.push(doc);
                });
                   setTimeout(()=>{
                       resolve(userdocs);
                   }, 6000);
                  

               });
            });

        });
    }

}