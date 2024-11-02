import mongoose from 'npm:mongoose';

// Connect to MongoDB using Mongoose
const dbUrl = 'mongodb://localhost:27017/denoDB'; // Ensure this URL is correct for your setup
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a simple schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

// Example function to create a user
async function createUser() {
    const newUser = new User({
        name: 'Bradley Matera',
        email: 'bradley@example.com',
        age: 32,
    });
    await newUser.save();
    console.log('User created');
}

createUser();