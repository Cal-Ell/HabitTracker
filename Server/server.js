require('./database/config');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 1337;
const habits = require("./routes/habits.js");
const cors = require('cors');
const users = require("./routes/users");
const path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
//const mongoose = require("mongoose");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));

// resolve CORS issue in Development only
app.use(function (req, res, next) {   
    res.header('Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(habits);
app.use(users);
// // view engine setup
// app.engine('pug', require('pug').__express)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//app.use('/', routes);
//app.use('/api/habits', habits);


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

async function main(){
    const uri = "mongodb+srv://Cal:Rathalos15@HabitTracker.g4jqs5b.mongodb.net/HabitTracker?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect(err => {
            //client.db("").collection("devices");
            // perform actions on the collection object
            
        });
        await listDatabases(client);
    } catch (e){
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    try {
        databasesList = await client.db().admin().listDatabases();

        console.log("Databases: ");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch(e) {
        console.log("error: ", e);
    }
    
}

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
