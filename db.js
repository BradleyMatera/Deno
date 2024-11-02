import mongoose from 'npm:mongoose';

const mongoURI = 'mongodb://localhost:27017/mydb';  // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;