// import mongoose from "mongoose";
const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(
        // nodejs(v17.x) -> mongoDB 주소를 localhost 대신 127.0.0.1 사용
        'mongodb://hyerin:k2o2i!mongo@127.0.0.1:27017', {
            dbName: 'week1',
            // console warning message prevention!
            useNewUrlParser: true,
            // useCreateIndex: true,
        }, (error) => {
            if (error) {
                console.log('db connection error', error);
            } else {
                console.log('db connection successful');
            }
        });
};

mongoose.connection.on('error', (error) => {
    console.error('db connection error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('The db is disconnected. Try again.');
    connect();
});

module.exports = connect;