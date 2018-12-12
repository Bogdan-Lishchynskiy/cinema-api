# Cinema-api-app

It is simple Cinema-api-app, you can call api through Postman and see the result.
App is deployed on Heroku server.

## Getting Started

App is stored on https://nameless-wave-59099.herokuapp.com and through Postman adding to url different api path you can make calls.

Example: 

* method POST/api/users - /api/users //Register new user.(required fields in req.body{"name": "", "email": "", "password": ""}

* method POST/api/auth - /api/auth //Authentication user in response header will get the token.(required fields in req.body{"email": "", "password": ""}

* method GET/api/users - /api/users //Get all users only for authentication users.(required fields in req.headers: key=x-auth-token  value=Authentication token

* method GET/api/users/:id - /api/users/:id //Get user by Id only for authentication users.(required fields in req.headers: key=x-auth-token  value=your Authentication token which get from api/auth

* method POST/api/genres - /api/genres //Add new genre only for authentication users.(required fields in req.body{"name": ""}

* method DELETE/api/genres/:id - /api/genres/:id //Delete genre by Id for authentication users.(required fields in req.body{"name": ""}

* method GET/api/genres - /api/genres //Get all genres only for authentication users.

* method GET/api/genres/:id - /api/genres/:id //Get genres by Id only for authentication users.

* method POST/api/movies - /api/movies //Add new movies.(required fields in req.body{"title": "", "genreId": ""}

* method GET/api/movies - /api/movies //Get all movies with releted genres to this movies.

* method GET/api/movies/:id - /api/movies/:id //Get movies by Id.

* method DELETE/api/movies/:id - /api/movies/:id //Delete movie by Id for authentication users.
