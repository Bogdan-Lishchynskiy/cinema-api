# Cinema-api-app

It is simple Cinema-api-app, you can call api through Postman and see the result.
App is deployed on Heroku server.

## Getting Started with testing via Postman

App is stored on https://nameless-wave-59099.herokuapp.com and through Postman adding to url different api path you can make calls.

Example: 

* method POST - /api/users //Register new user.(required fields in req.body{"name": "", "email": "", "password": ""}

* method POST - /api/auth //Authentication user in response header will get the token.(required fields in req.body{"email": "", "password": ""}

* method GET - /api/users //Get all users only for authentication users only.(required fields in req.headers: key=x-auth-token  value=Authentication token

* method GET - /api/users/:id //Get user by Id only for authentication users only.(required fields in req.headers: key=x-auth-token  value=your Authentication token which get from api/auth

* method POST - /api/genres //Add new genre only for authentication users only.(required fields in req.body{"name": ""}

* method DELETE - /api/genres/:id //Delete genre by Id for authentication users only.(required fields in req.body{"name": ""}

* method GET - /api/genres //Get all genres only for authentication users only.

* method GET - /api/genres/:id //Get genres by Id only for authentication users only.

* method POST - /api/movies //Add new movies.(required fields in req.body{"title": "", "genreId": ""} genreId releted to this movie.

* method GET - /api/movies //Get all movies with releted genres to this movies(nested in movie object).

* method GET - /api/movies/:id //Get movies by Id.

* method DELETE - /api/movies/:id //Delete movie by Id for authentication users only.

### Getting Started with cloning project and run locally

You can simply clone this project.

```
npm install
```
To run it on http://localhost:3000 ,you need to run on background Mongodb server on port 27017,after you can press

```
npm start
```
To run tests you need press

```
npm test
```
