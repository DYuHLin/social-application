const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.set('strictQuery', false);
const mongoDB = 'mongodb+srv://dyhlin2000:damian1216@cluster0.dtezc2s.mongodb.net/social_application?retryWrites=true&w=majority&appName=Cluster0';

async function main(){
    mongoose.connect(mongoDB);
};

main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

const server = app.listen(3000, () => console.log('App is listening'));