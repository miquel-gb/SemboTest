# Sembo test
It's required to build a server app that retrieves hotels info per country from Sembo's API and returns this data computed into an average score for each country and the three highest rated hotels. This data will be displayed in an easy web application that will require no interaction with the user, will only load the data and display it.

### Technologies
Dince I'm mainly a frontend developer I've chosen to use **NodeJS** for the server application, since it's use will be easier for me, and the web application will be built using a little **Angular** app.

The **NodeJS** server will be hosting the built files from the web application aswell as the endpoint needed to retrieve computed data.

## Server application

The server application will be a **NodeJS** app using **express** package to easily run a web server and serve the frontend files and the API, for the API it'll use **requestretry** package to retrieve the data from Sembo's API (due to the 75% fail ratio) and **async** package to start trying to retrieve the data for all countries at once.

Once the server is run (by running the provided script) or by running **node index.js** inside **node-server** folder, the app will be hosted at _http://localhost:3000_, this port can be changed at index.js file by modifying _appport_ const.

**Notes:** For the server application I was thinking that maybe it was a good idea to cache in some way the data because of the fail ratio of the API, but I decided to not do it so the data displayed to the user will always be truthy.

## Web application

The web application is a simple implementation of an **Angular** app, located inside **sembo-frontend** folder, it has just one component that will call the Node app to retrieve the computed data and display it, while the data is loading it will display a simple spinner to let the user know the app is still loading data.

The frontend app also has a file called _hotel-rating.models_ that contains the definition for the objects that will be retrieved from the API.

This app will be build by the deployment script and hosted by the Node server.

# Deployment

The only requirement for the deployment of the app is to have **node** and **npm** and to have port 3000 available (unless it's changed in the code).

### Deployment by script
A deployment script is provided, located at root level for the repository, called **deploy.bat**, this script will install the packages needed for both web and server application, will build the web application so it can be served by the server, and will launch the server, after that (if the port hasn't been changed in the code) the application will be available at _http://localhost:3000_.

### Deployment by commands
If you wish to deploy the app without using the script, you should start by going into **sembo-frontend** folder, and run command 
>npm install

this will install the required packages, after that the web app should be built by running
>npm run build

after building the web app you should change to the **node-server** folder and install the packages by running
>npm install

and after installing the packages the server can be started by running
>node index.js

after that (if the port hasn't been changed in the code) the application will be available at _http://localhost:3000_.