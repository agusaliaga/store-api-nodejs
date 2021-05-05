const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/router.js')

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://admin:1234m3l@cluster0.72kpg.mongodb.net/api-store-nodejs?retryWrites=true&w=majority',
    //'mongodb://localhost:27017/store-api',
    {
        useNewUrlParser: true,
    }
)
.then(db => console.log('MongoDB connected'))
.catch(error => console.log(error));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors
app.use(cors());

app.use('/', routes());

app.use(express.static('uploads')); //expose as public in server

app.listen(process.env.PORT || 5000);
