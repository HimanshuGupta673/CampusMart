import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {

    const MONGODB_URI = `mongodb+srv://Himanshu:EyGRsYWT3DQgVIC7@cluster0.cdfcrd3.mongodb.net/?retryWrites=true&w=majority`;
    // const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.cdfcrd3.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true});

    mongoose.connection.on('connected', () => {
        console.log('Database connected Successfully');
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    })

    mongoose.connection.on('error', (error) => {
        console.log('Error while connecting with the database ', error.message);
    })
}

export default Connection;