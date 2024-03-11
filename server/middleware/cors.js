require('dotenv').config();

// const whitelist = [ 'http://' + process.env.LOCAL_IP + ':' + process.env.LOCAL_PORT];
const whitelist = [ 'http://localhost:3000' ]
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true)
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
}

module.exports = {corsOptions}