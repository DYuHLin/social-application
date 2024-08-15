const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const auth = require('./Routers/authRoutes');
const comment = require('./Routers/commentRoutes');
const posts = require('./Routers/postRoutes');
const socket = require('socket.io');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    optionSuccessStatus:200,
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

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173', 
        credentials: true,
        optionSuccessStatus:200,
    }
});

io.on('connection', (socket) => {
    console.log('connected:' +socket.id);

    socket.on('join_post', (data) => {
         console.log(`user ${socket.id} joined the room ${data}`)
         socket.join(data);
    });

    socket.on('send_post', (data) => {
         socket.broadcast.emit('get_posts', data);
         console.log(data);
    });

    socket.on('send_comment', (data) => {
        socket.to(data.post).emit('get_comments', data);
        console.log(data);
   });

    socket.on('disconnect', () => {
        console.log('disconnected:' + socket.id);
    });
});