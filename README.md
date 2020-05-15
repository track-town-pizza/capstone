# Capstone CS Group 74 Track Town Pizza Web Application

This web application will replace and add to Track Town Pizza's existing website.

## Installation

### Prerequisites

Before setting up this project, download the most recent version of Node.js. To check if Node.js is installed and/or
what version it is, run the following command:

`node --version`

### Clone

Once the most recent version of Node.js has been installed, clone this repository with `https://github.com/track-town-pizza/capstone.git`.

### Setup

Create a `.env` file in the root directory of the project and add the `MONGODB_URL`, `URL_ROOT`, `API_KEY`, and `PORT` environment variables with the values securely delivered to you. If you do not have the proper values for any of the variables, please contact any of the project members to gain access to them.
Note: the project will not run properly without some of these values. Please make sure the values you have are correct.

Install the project's npm packages using

`npm install`

then specifically install the next npm package to ensure the server commands will run with

`npm install next`

### Usage

To run the web server and start the application in a development environment, run

`npm run dev`

If you wish to run the application in a production environment, build the application with

`npm run build`

then start the application with

`npm run start`

To access the application on a web browser, navigate to the following URL:

`http://localhost:3000`

To access the Content Management System, navigate to the following URL:

`http://localhost:3000/admin/managementHub`

### Additional Information

To view the code review critiques written for this project and our responses to them, please refer to the tables documented in `CritiqueResponses.md`.