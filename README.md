# Node-Authentication-API
This project (Node Authentication API) is a MERN Application (MongoDB, Express, React and Nodejs). Users can sign up, signIn via username and password or using their Github account, edit and update and view profile.


Node Authentication API implements different authentication strategies using Passport authentication. There are over 500 authentication strategies; this API specifically uses three of them:
Username and password, 
Json web tokens and 
Github authentication provider. 


## Passport Authentication
 Passport is an authentication middleware that parses requests from the user/client before it accesses a database.

## Passport Libraries
 Passport-local: middleware that parses username and password before a user is signed in.

 Passport-JWT: middleware that parses a jwt token before authenticated user can access database.

 Passport-github : use of github authentication provider via passport to sign in user.


## Starting This App
For the api server, type the following commands from the root directory:
### `cd api`

### `npm run start`


Runs the app in the development mode.<br>
Open [http://localhost:8001](http://localhost:8001) to view it in the browser.

for the client react app, type the following commands from the root directory:

### `cd client`

### `npm start`

The app starts, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Acknowledgements
- [Passportjs](https://www.passportjs.org) -  Well written documentation
