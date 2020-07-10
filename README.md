--- Software documentation ---

-------------How to use the app-------------

1) 
install node_modules

2)
Enviromental variables to run your app -->
.env file for server (root if repo):
DATABASE = mongodb link to your database
PORT = your port number (client folder proxy is port 9000)
JWT_SECRET = JWT secret
GOOGLE_CLIENT_ID = from google
FACEBOOK_APP_ID = from facebook

.env file for client:
REACT_APP_GOOGLE_CLIENT_ID = from google
REACT_APP_FACEBOOK_APP_ID = from facebook

3)
From the root of the repo you can run the server:
npm run server

From client folder you can run the frontend:
npm start

4) App is also deployed with Heroku:

https://docbuddyapp.herokuapp.com


-------------System architecture-------------

This will be a MERN app comprising the following technologies
 - front end:
Html, css and 
create-react-app 
React bootstrap for styling 

 - backend:
 node.js 
 express

 - server:
 MongoDB


 -------------How the application will work:-------------
 - Users will be able to book appointments with their doctor without contacting the office via call
 - Doctors office will have administrative rights which will allow them to view/shedule/reschedule appointments and view all of patients detials

 -------------Users of the application:-------------
 Users wishing to schedule appointments with doctor in advance
 Users wishing to make notes on their visit (recording the outcome and the prescribed pills they were issued etc..)

 Admin of the application:
 Doctor offices can make bookings as well but also manage all the users on the application (delete them)

 Benefits:
 Saves time at the desk completing/updating information in a form
 Helps users plan their time around the appointment as opposed to going to the doctor and waiting to be assisted
 

 -------------Functional/Non-Functional requirements:-------------
 Functional requirements:
 - Users must be able to make appointments and view thier appointment/s when logged in
 - Admin/Doc offce must be able to view/shedule/reschedule appointments of users or create new ones from the start

 Nonfunctional requirements:

 -------------Usability:-------------
 App will be simple to use and straight forward with clear instructions provided to both user and admin on how to use the app.
 Assistance regarding the usability will be encapsulated in the " how it works " tab

 -------------Reliability:-------------
 The app will be hosted with heroku so as to ensure it is up and running 24h a day.

 -------------Performance:-------------
 The app will be making use of the latest frameworks and technologies so as to prevent and delays with using the app

 -------------Security-------------
 Basic security will be used to protect user information from being accessed without authorisation
 Helmet Express.js security with HTTP headers. Latest version: 3.23.0--- Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!
 All users, both end users and admin would need to sign in the app if they would like to make use of any of its functionaiity.
