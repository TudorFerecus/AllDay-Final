import axios from "axios"

const DATABASE_LINK = 'https://allday-final.onrender.com/api/v1'
// const DATABASE_LINK = 'http://0.0.0.0:8000/'
function LoginAPI(data, onResponse, onError)
{
    const url = DATABASE_LINK + '/users/login'
    axios.post(url, data)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res);
        }
        else
        {
            onError(res);
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function RegisterAPI(data, onResponse, onError)
{
    const url = DATABASE_LINK + '/users/register'
    axios.post(url, data)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res);
        }
        else
        {
            onError(res);
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function NewStatAPI(data, onResponse, onError)
{
    const url = DATABASE_LINK + '/stats/createStat'
    axios.post(url, data)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res);
        }
        else
        {
            onError(res);
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function GetAllUsersAPI(onResponse, onError)
{
    const url = DATABASE_LINK + '/users/getAllUsers'
    axios.get(url)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res.data.users);
        }
        else
        {
            return 0;
        }
    })
    .catch((error) => {
        console.log(error)
    })

}

function GetAllConnectionsAPI(team, onResponse, onError)
{
    const url = DATABASE_LINK + '/connections/getConnectionByTeam'
    axios.post(url, {team: team})
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res.data.connection);
        }
        else
        {
            onError(res);
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function GetLastConnection(onResponse, onError)
{
    const url = DATABASE_LINK + '/connections/getLastConnection'
    axios.get(url)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res.data.connection.users);
        }
        else
        {
            onError(res);
        }
    })
    .catch((error) => {
        console.log(error)
    })

}

function GetUser(user, onResponse, onError)
{
    const url = DATABASE_LINK + '/users/getUser'
    axios.post(url, user)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res.data.user);
        }
        else
        {
            onError();
        }
    })
    .catch((error) => {
        console.log(error)
    })

}

function GetStat(user, onResponse, onError)
{
    const url = DATABASE_LINK + '/stats/getStat'

    axios.post(url, user)
    .then((res) => {
        if(res.status === 200)
        {
            onResponse(res.data.stat);
        }
        else
        {
            onError();
        }
    })
    .catch((error) => {
        console.log(error)
    })

}

function PostPhoto(data, onResponse, onError)
{
    const url = DATABASE_LINK + '/cloudUpload/uploadImage'
    axios({
        method: 'post',
        url: url,
        data: data,
        config: { headers: { 'Content-Type': 'multipart/form-data' }}
    })
    .then((res) => {
        onResponse(res.data);
    })
    .catch((error) => {
        onError(error);
    })
}

function UpdateUser(data, onResponse, onError)
{
    const url = DATABASE_LINK + '/users/updateUser'
    axios.put(url, data)
    .then((res) => {
        onResponse(res.data);
    })
    .catch((error) => {
        onError(error);
    })
}

export {
    LoginAPI, 
    RegisterAPI, 
    NewStatAPI, 
    GetAllUsersAPI, 
    GetAllConnectionsAPI,
    GetLastConnection,
    GetUser,
    GetStat,
    PostPhoto,
    UpdateUser
}