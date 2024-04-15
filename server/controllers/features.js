require('dotenv').config();

const checkIP = (req, res) =>{
    const ip = req.headers['x-forwarded-for']
    const ip2 = req.socket.remoteAddress
    console.log(ip)
    console.log(ip2)

    return res.json({
        success: true,
        ip
    })

}

module.exports = {checkIP}