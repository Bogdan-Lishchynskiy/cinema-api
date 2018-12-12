# Cinema-api-app

It is simple Cinema-api-app, you can call api through Postman and see the result.
App is deployed on Heroku server.

## Getting Started

App is stored on https://nameless-wave-59099.herokuapp.com and through Postman adding to url different api you can make calls.
Example: 

method POST/api/users - https://nameless-wave-59099.herokuapp.com/api/users //Register new user.(required fields in req.body{"name": "", "email": "", "password": ""}

method POST/api/auth - https://nameless-wave-59099.herokuapp.com/api/auth //Authentication user in response header will get the token.(required fields in req.body{"email": "", "password": ""}

method GET/api/users - https://nameless-wave-59099.herokuapp.com/api/users //Get all users only for authentication users.(required fields in req.headers: key=x-auth-token  value=Authentication token

method GET/api/users/:id - https://nameless-wave-59099.herokuapp.com/api/users/:id //Get user by Id only for authentication users.(required fields in req.headers: key=x-auth-token  value=Authentication token
