const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const auth = require('./Routers/authRoutes');
const comment = require('./Routers/commentRoutes');
const posts = require('./Routers/postRoutes');

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'https://api.cloudinary.com/v1_1/dqdoxrm2x/image/upload'], 
    credentials: 'include'
    }));
app.use(express.json({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

mongoose.set('strictQuery', false);
const mongoDB = 'mongodb+srv://dyhlin2000:damian1216@cluster0.dtezc2s.mongodb.net/social_application?retryWrites=true&w=majority&appName=Cluster0';

async function main(){
    mongoose.connect(mongoDB);
};

main().catch((err) => console.log(err));

app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/comment', comment);


const server = app.listen(3000, () => console.log('App is listening'));