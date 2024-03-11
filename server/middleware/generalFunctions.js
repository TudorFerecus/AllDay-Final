const jwt = require('jsonwebtoken');
const exec = require('child_process').exec;
require('dotenv').config();

const getUserSearchFilter = (body) => {
    let bodyName = body.name;
    let bodyMail = body.mail;
    let bodyIP = body.IP;
    let bodyID = body.ID;
    let searchFilter = {}

    if(bodyName)
        searchFilter.name = bodyName;

    if(bodyMail)
        searchFilter.mail = bodyMail;

    if(bodyIP)
        searchFilter.IP = bodyIP;

    if(bodyID)
        searchFilter._id = bodyID;

    return searchFilter

}

const validateUser = (user, token) => {
    if(token, process.env.JWT) return true;
    return false;

}


const allowControlOrigin = (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
}

const checkAuthorization = (req, res, next) => {
    
    const token = req.body.token;
    if(!token)
        return res.status(401).json({
            success: false,
            status: "Couldn't validate user! Redirecting to login"
        })
    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if (err)
        {
            return res.status(401).json({
                success: false,
                status: "Couldn't validate user! Redirecting to login"
            })
        }
    });
    
    next();
}

const getUserLocalIp = (callback) => {
    exec(`netstat -an | FINDSTR ` + `"` + process.env.LOCAL_IP_PORT + ':' + process.env.LOCAL_PORT + `"`, 
      function (error, stdout, stderr) {
        if (error !== null) 
            callback("fail");
        callback("fin " + stdout);
      });
}

function diffMinutes(date1, date2) {
    const d1 = new Date(date1).getTime();
    const d2 = new Date(date2).getTime();
    const diff = Math.abs(Math.round((d2 - d1) / 60000))
    return diff; // Can use Math.floor or Math.ceil depends up to you
}

module.exports = {getUserSearchFilter, validateUser, allowControlOrigin, checkAuthorization, getUserLocalIp, diffMinutes}