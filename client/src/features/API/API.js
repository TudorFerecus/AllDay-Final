import axios from "axios"

function LoginAPI(data, onResponse, onError)
{
    const url = 'https://allday-final.onrender.com/api/v1/users/login'
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
    const url = 'https://allday-final.onrender.com/api/v1/users/register'
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
    const url = 'https://allday-final.onrender.com/api/v1/stats/createStat'
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
    const url = 'https://allday-final.onrender.com/api/v1/users/getAllUsers'
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
    const url = 'https://allday-final.onrender.com/api/v1/connections/getConnectionByTeam'
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
    const url = 'https://allday-final.onrender.com/api/v1/connections/getLastConnection'
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
    const url = 'https://allday-final.onrender.com/api/v1/users/getUser'
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
    const url = 'https://allday-final.onrender.com/api/v1/stats/getStat'

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
    const url = 'https://allday-final.onrender.com/api/v1/cloudUpload/uploadImage'
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
    const url = 'https://allday-final.onrender.com/api/v1/users/updateUser'
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