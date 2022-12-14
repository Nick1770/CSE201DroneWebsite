## CSE201 Drone Website With SQL DataBase

This project was built with React, MySQL, and Node Js.
### Prerequisites

Here are a few things you will need before installation. You may be asked to type Y or N during installation.

1. First you will need git

For Windows use 
```sh
https://git-scm.com/download/win
```

For MacOS
```sh
brew install git
```


2. You will also need npm & node.js use this link
https://nodejs.org/en/download/


  
  

### Clone this repository



1. Run this command once all pre-requisites are installed
   ```sh
   git clone https://github.com/Nick1770/CSE201DroneWebsite.git
   ```

### How to set up the database (We used MySqlWorkbench)
1. Create database using file found here: 
   ```
   ./api/config/db.sql
   ```

### How to set up the api
1. Change directory to ./api
   ```sh
   cd ./api
   ```
2. Run this command
   ```sh
   run npm i
   ```
   
3. Add .env file to the api folder with the following template (filling in missing values):
 ```
# dev or prod
NODE_ENV = "dev"

HOST = "localhost"
PORT = 5000
# in node env, generate secrets with: require('crypto').randomBytes(64).toString('hex')
SESSION_SECRET = ""

DB_USER = "root"
DB_PASSWORD = "" # attained when setting up MySQL
DB_NAME = "CSE201"
```
4. Start the api
```
npm run start
```

### How to set up the frontend/react
1. Navigate to the correct directory
   ```sh
   cd ./frontend
   ```
2. If you haven't already
   ```sh
   npm i
   ```
3. To run the website
   ```sh
   npm run start
   ```
4. Enjoy! You should have both a "local host" and a On your Network address
   

### Downloads

* NodeJS: https://nodejs.org/en/download/
* MySQL: https://dev.mysql.com/downloads/mysql/

<p align="right">(<a href="#top">back to top</a>)</p>
