Deno Express MongoDB Project

Overview

This project demonstrates a full-stack web application built using Deno, Express.js (via Deno’s npm integration), MongoDB, and the Mongoose ORM. The application showcases how these technologies can work together to provide a modern, scalable, and efficient server-side platform using Deno’s unique features and the flexibility of npm libraries.

The project includes a basic API that handles HTTP requests, serves static files, and integrates with MongoDB using an Object-Relational Mapping (ORM) tool to interact with the database more easily.

Technologies Used

1. Deno

Deno is a modern runtime for JavaScript and TypeScript that improves security and performance while offering a more integrated developer experience.

	•	Key Features of Deno:
	•	First-class TypeScript support.
	•	Secure-by-default, meaning it only allows explicit access to the file system, network, and environment variables.
	•	Uses URL-based imports instead of node_modules.
	•	Seamless integration with npm packages from Deno 2.0 onwards, allowing tools like Express.js to run directly.

2. Express.js

Express.js is a minimal and flexible Node.js web application framework that provides robust features for building APIs and web applications. In this Deno project, Express.js is used for routing and handling HTTP requests.

	•	Why Use Express with Deno?
	•	The Express.js framework simplifies the process of routing, middleware handling, and managing requests/responses.
	•	Deno’s npm integration enables using Express just like you would in a Node.js environment.
	•	It supports building RESTful APIs in a concise and scalable way.

3. MongoDB

MongoDB is a NoSQL database that stores data in JSON-like documents. It’s known for its scalability and flexibility in handling large amounts of unstructured data.

	•	Why MongoDB?
	•	Perfect for applications that require a flexible schema, such as user data storage and dynamic content.
	•	Easy integration with JavaScript, making it a great fit for Express-based backends.

4. Mongoose (ORM)

Mongoose is an Object-Relational Mapping (ORM) library used to interact with MongoDB. In this project, Mongoose is used to define schemas, manage data relationships, and handle CRUD operations in MongoDB.

	•	Why Mongoose?
	•	Mongoose provides a more structured and developer-friendly way to interact with MongoDB.
	•	It simplifies data validation and schema enforcement.
	•	Using an ORM reduces the need to write repetitive database interaction code and improves maintainability.

Project Structure

.
├── README.md              # Project description and guide
├── db.js                  # MongoDB connection and Mongoose schema definition
├── deno.json              # Deno configuration file for tasks and imports
├── deno.lock              # Deno's lockfile for dependency management
├── deps.js                # Dependency file for importing modules
├── import_map.json        # Mapping file for Deno imports
├── main.js                # Main server file that runs the Express server
├── models                 # Folder containing Mongoose schema models
│   └── User.js            # Example schema for users in MongoDB
├── public                 # Folder containing static files (e.g., index.html)
│   └── index.html         # Frontend file for rendering the UI
└── test.js                # Basic test file to test server and API functionalities

2 directories, 10 files

Key Files

1. db.js

This file is responsible for setting up the connection to MongoDB using Mongoose. It includes the configuration for the MongoDB URI and defines Mongoose models.

import mongoose from 'npm:mongoose';

const mongoURI = 'mongodb://localhost:27017/mydb';  // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;

2. models/User.js

This file defines a Mongoose schema for a user. It outlines the structure of user documents in the MongoDB database and includes basic validations.

import mongoose from '../db.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;

3. main.js

The main server file initializes the Express.js server and sets up API routes. It handles requests and responses and integrates with the MongoDB database using the Mongoose ORM.

import express from 'npm:express';
import User from './models/User.js';

const app = express();
const port = 8000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express and MongoDB!');
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`HTTP server is running on http://localhost:${port}`);
});

Running the Project

Step 1: Install Deno

Ensure Deno is installed. You can install it by following the instructions on Deno’s official site.

Step 2: Start MongoDB

Make sure MongoDB is running locally or remotely accessible.

Step 3: Run the Development Server

To start the development server with file watching, use:

deno task dev

This will start the server on http://localhost:8000.

Step 4: Test the API

You can test the API using tools like Postman or curl:

	•	GET request to /: Responds with “Hello from Express and MongoDB!”.
	•	POST request to /users: Sends JSON data to create a new user in the MongoDB database.

Additional Tools and Features

1. Linting and Formatting

To ensure consistent code quality, use:

deno lint
deno fmt

2. Testing

To run tests, you can define your test cases in test.js and use:

deno test

3. Import Maps

The import_map.json is used to manage external dependencies more efficiently. By mapping external URLs, Deno avoids the need for relative paths in imports.

Conclusion

This project demonstrates how to set up a simple but robust web application using Deno, Express.js, MongoDB, and Mongoose. It leverages Deno’s support for npm packages and its security model to create an efficient, modern development environment. The use of Mongoose simplifies interactions with the MongoDB database, providing an ORM layer for structured data management.

Feel free to explore the code and experiment with adding more routes, models, or front-end components!