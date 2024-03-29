# firebase_authentication

### Import postman collection -> firebase_authentication.postman_collection.json to postman

## Start app
npm start

- Server will run on http://localhost:3001/ base endpoint

## Register User
- send a POST request with the following body to endpoint http://localhost:3001/api/auth/register 

```json
{
    "email":"test@gmail.com",
    "password":"test123"
}
```
## Login User
- send a POST request with the following body to endpoint to http://localhost:3001/api/auth/login 

```json
{
    "email":"test@gmail.com",
    "password":"test123"
}
```

## Login with google with consent url
- Send a GET request to http://localhost:3001/api/auth/google to get the google consent url 

## Send the authorization code after google consent url signin of user to register user with firebase
- Send a POST request to http://localhost:3001/api/auth/google-user endpoint with the following body
```json
{
    "code":"4/0AeaYSHD3BjF_olGvhMur1Q_OofLZf6IxwKzMS9qGnBQ7KUS3iDPNpH6VmZWytJiaKsMgiA"
}
```

## To run using docker run the following commands
### Create the docker image of the project with the following command
- $ sudo docker build .

### Get the list of docker images with the following command
- $ sudo docker images -a

### Run the docker image with the following command
- $ sudo docker run --network="host" image-id