### BIKE SERVICE APPLICATION ###

//....HOW TO RUN APPLICATION....//

--> cd Bike-Service-Application

       ''' npm install '''

--> cd Bike-Service-Application\frontend\bike-reacyjs\

      '''  npm install  '''

--> cd ../../

       ''' node app.js '''

--> cd Bike-Service-Application\frontend\bike-reacyjs\


      ''' npm start '''
      
      
      //....DOCUMENT SCHEMA....//
      
      Schema for user Document:-
{

_id: '', name: '' ,

email: '' , phoneNumer: '' ,

bookings: [

     {'name':''},
     
      {'BikeModel': ''},
      
      {'BikeNumber': ''},
      
       {'ServiceType': ''},
       
       {'status': ''},
       
       {'bookingID': ''}
       
       ]
       
       }

Schema for service types Document:-

{
_id:'' ,

name: 'offeringservices' 

services: ['waterwash', 'generalservice', 'oilchange']

}



