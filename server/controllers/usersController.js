const Users = require('../models/users');

const { StatusCodes } = require('http-status-codes');
const {getUserSearchFilter, getUserLocalIp} = require('../middleware/generalFunctions')
const {cloudinary} = require('../middleware/cloudinary')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const register = async (req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyIP = "TODO"
    let profilePhoto = process.env.PROFILE_PHOTO_PLACEHOLDER;
    let bodyPassword = req.body.password;

    if(bodyName && bodyMail && bodyIP && bodyPassword)
    {
        const hashedPassword = await bcrypt.hash(bodyPassword, 10);
        getUserLocalIp(async (out) => {
            if(out === "fail")
            {
                return
            }
            if(out === 'fin ')
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    status: "action failed, make sure you remain connected to the page untill the account is created"})
            else
            {
                bodyIP = out.split('\n')[0].split(' ')

                let i = 0;
                let minIPcharLength = 8;
                while( i < bodyIP.length )
                {
                    if(bodyIP[i].length < minIPcharLength)
                    {
                        bodyIP.splice(i, 1)
                    }
                    else 
                    {
                        i++;
                    }
                }

                const user = await Users.findOne({mail: bodyMail});
                user.IP = bodyIP[1].split(':')[0];
                console.log(bodyIP[1].split(':')[0])
                user.save()
            }

          });
        const user = await Users.create({
            name: bodyName,
            mail: bodyMail,
            IP: bodyIP,
            password: hashedPassword,
            profilePhoto: profilePhoto
        })

        if(user)
        {
            const token = jwt.sign(user.toObject(), process.env.JWT, {expiresIn: '365d'});

            return res.status(StatusCodes.OK).json({
                success: true,
                createdUser: user,
                token
            });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false
        })
    }

    else
    {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false
        })
    }
}

const login = async (req, res) => {
    let mail = req.body.mail;
    let password = req.body.password;

    if(mail && password)
    {
        const user = await Users.findOne({mail: mail});
        if(user)
        {
            let isGoodPass = await bcrypt.compare(password, user.password)
            if(isGoodPass)
            {
                const token = jwt.sign(user.toObject(), process.env.JWT, {expiresIn: '365d'});

                return res.status(StatusCodes.OK).json({
                    success: true,
                    user,
                    token
                })
            }
            else
            {
                return res.json({success: false});
            }
        }
        else 
        {
            return res.json({success: false});
        }
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
        success: false
    })

}

const getUser = async(req, res) => {

    const searchFilter = getUserSearchFilter(req.body);

    const user = await Users.findOne(searchFilter);

    if(user)
    {
        return res.status(StatusCodes.OK).json({
            success: true,
            user: user
        })
    }

    return res.status(StatusCodes.NOT_FOUND).json({
        success: false
    })


}

const getAllUsers = async (req, res) => {
    const users = await Users.find({})

    if(users)
    {
        return res.status(StatusCodes.OK).json({
            success: true,
            users: users
        })
    }

    return res.status(StatusCodes.NOT_FOUND).json({
        success: false
    })

}

const updateUser = async (req, res) => {

    const searchFilter = getUserSearchFilter(req.body);
    const user = await Users.findOne(searchFilter);

    if(user)
    {
        const newProfilePhoto = req.body.profilePhoto;

        if(newProfilePhoto)
        {
            let linkParse = user.profilePhoto.split('/');
            let fileName = linkParse[linkParse.length - 1].split('.')[0];
            if(user.profilePhoto != process.env.PROFILE_PHOTO_PLACEHOLDER)
                cloudinary.uploader
                    .destroy(fileName)
                    .then((result) => {});
            user.profilePhoto = newProfilePhoto;
        }
        await user.save();

        const token = jwt.sign(user.toObject(), process.env.JWT, {expiresIn: '365d'});

        return res.status(StatusCodes.OK).json({
            success: true,
            user,
            token
        })
    }

    else
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            status: "Could not find user!"
        })
        

}

module.exports = {register, login, getUser, getAllUsers, updateUser};