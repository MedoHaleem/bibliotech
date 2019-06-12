# Express Coding Challenge
The premise of this challenge is to see the approach you take to:
- Use an ORM to interact with a simple database model
- Create a basic routing mechanism for HTTP requests
- Authenticate a user’s access to a route
- Respond to a request in a consistent and logical manner
- Test your work with both unit tests and integration tests.

Please clone this repository and send through your completed coding challenge using whatever you feel fit. We'll take a look and then have a chat about the decisions you took and challenges you encountered. Thanks for taking the time.


## Running this application
You can run the application by typing:
`npm install` to install the required packages

`npm install -g sequelize-cli` I'm using sequelize as ORM of choice 

go to `config/dbconfig.js` and change db connection according to your own options

you can run `npm start` to start the application then type this in the terminal `sequelize db:seed:all` to populate the data with dummy data

You can run the app in cluster mode by typing `npm run clusters`

## Testing this application

If you are running windows then simpley run `npm test` if you are running linux/MacOs type `npm run linux-test`


## Important

I have added comments for some of my design decision to clarify why I did it this way.