const express = require("express")
const multer = require('multer');
const cors = require('cors');

const app = express()
const upload = multer();

const connectionsRouter = require("./routes/connections.js");
const usersRouter = require('./routes/users.js');
const statsRouter = require('./routes/stats.js')
const featuresRouter = require('./routes/features.js');
const uploadRouter = require('./routes/uploadRouter');

const {allowControlOrigin} = require('./middleware/generalFunctions.js')
const {corsOptions} = require('./middleware/cors.js')
const connectDB = require('./db/connect.js');

require('dotenv').config();

const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

app.use(express.json());
app.use(allowControlOrigin);
app.use(cors({
    origin: ['http://localhost:3000', 'https://main--all-day.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
}));

app.use('/api/v1/connections', connectionsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/stats', statsRouter);
app.use('/api/v1/features', featuresRouter);
app.use('/api/v1/cloudUpload', cors(corsOptions), upload.single('file'), uploadRouter)

const start = async () => {
    try{
        await connectDB(mongo_uri);
        app.listen(port, ()=>{
            console.log(`server listening to port ${port}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();