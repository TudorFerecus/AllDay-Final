import axios from "axios"

function LoginAPI(data, onResponse, onError)
{
    const url = 'api/v1/users/login'
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
    const url = 'api/v1/users/register'
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
    const url = 'api/v1/stats/createStat'
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
    const url = 'api/v1/users/getAllUsers'
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

function GetAllConnectionsAPI(onResponse, onError)
{
    const url = 'api/v1/connections/getAllConnections'
    axios.get(url)
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
    const url = 'api/v1/connections/getLastConnection'
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
    const url = 'api/v1/users/getUser'
    axios.post(url, {IP: user})
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

export {
    LoginAPI, 
    RegisterAPI, 
    NewStatAPI, 
    GetAllUsersAPI, 
    GetAllConnectionsAPI,
    GetLastConnection,
    GetUser
}