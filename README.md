# Fal API
This README provides instructions on how to run and use the Fal API developed using Node.js and MongoDB. This API generates and delivers fortunes based on a user's age, mood, gender, and relationship status.

## Technical Details
Requirements
Node.js: You can download and install the latest version of Node.js from here.
MongoDB: We need MongoDB to store fortune data. You can get MongoDB from MongoDB.

Installation
Clone the repository:

```
git clone https://github.com/ahmettopak/FortuneTellingAPI.git
```

## Install dependencies:

```
npm install
```
Configuration
Database settings:
To configure the API to connect to the MongoDB database, you can edit the config.js file and set the MongoDB connection URL and any other required configurations.

```
// index.js
process.env.MONGODB_URL
```
## Starting the API
You can start the API using the following command:

```
npm start
```
The API will run by default on localhost:3000. You can send requests to this address using your browser or API testing tools.

## API Endpoints
POST /api/fal

Description: Use this endpoint to create a new fortune.
Request Body: JSON data
```json

{
  "age": 25,
  "mood": "happy",
  "gender": "male",
  "relationship_status": "single"
}
```
Response: JSON representation of the created fortune

```json

{
  "_id": "fortune_id",
  "age": 25,
  "mood": "happy",
  "gender": "male",
  "relationship_status": "single",
  "fortune": "You will encounter a pleasant surprise!",
  "created_at": "2023-07-19T12:00:00.000Z"
}
```
Error Handling
In case of errors, the API will respond with appropriate error codes and messages.
Application Usage
Once you have successfully run the API, you can use it by following these steps:

Send a Request: Send a POST request to the /api/fal endpoint from your application or API testing tool, providing the required data in JSON format.
Receive the Response: The API will generate a fortune based on the provided data and respond with the JSON representation of the created fortune.
Conclusion
You are now ready to use the Fal API developed using Node.js and MongoDB! This README provides you with basic information on how to run the API and how to use it. If you want to add more features or customize the API to suit your needs, you can explore the application's code and make the necessary modifications.

Enjoy and have fun using the Fal API!