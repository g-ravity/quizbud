# QuizBud : Online Personality Quiz Maker to Share and Play With your Friends

URL: https://quizbud.netlify.com/

## How To Use QuizBud

- Visit the home page link
- Enter your name
- Answer the questions (pick your most preferrable choice out of the given ones)
- Your quiz link will be generated
- Share the link with your friends
- When you visit the link from the same browser that you created the quiz in, you'll be able to see the results of your quiz

Admins can also add/delete questions for the quiz

- Visit the /admin route
- Enter your login credentials
- Add/Delete questions

## Getting Started

These instructions will get you a copy of the
project up and running on your local machine for
development and testing purposes.

### Prerequisites

You need to have Nodejs and npm installed to run
this app from your PC.

### Installing the required modules

Delete the 'node_modules' folder if present, else
continue. Then, install the npm modules by typing
the following command:

```
npm install
```

Do the same inside the client (React) folder, as
it runs separate from server side.

NOTE: If for some reason devDependencies are not installed using the "npm install" command, then run the following command:

```
npm install --dev
```

## Running the app

Before running the server, you need to provide a value for jwtPrivateKey using the following command:

```
export quizbud_jwtPrivateKey= <EnterYourPrivateKey>
```

Then start the server using the following command:

```
npm start
```

To run the React server, change directory to
client and then, type the command:

```
npm start
```

You can edit the source files, which are present
in the src folder. You can live test them on the
React webpack server. React static build files
will automatically get created on deployment.

## Built With

- MongoDB
- Express
- React
- NodeJs

## Author

- **Ravik Ganguly**

## License

This project is licensed under the MIT License -
see the
[LICENSE.md](LICENSE.md)
file for details
