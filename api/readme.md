# CSE201 API
## How to Setup API:
* run ```npm i```
* create MySQL database using the file found here: ```./config/db.sql```
* add .env file to the root folder with the following template (_filling in missing values_):
```
# dev or prod
NODE_ENV = "dev"
HOST = "localhost"
PORT = 5000
# in node env, generate secrets with: require('crypto').randomBytes(64).toString('hex')
SESSION_SECRET = ""
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "CSE201"
```
* run ```npm run start``` or ```npm run dev```
* api documentation found at route ```/docs```
