
function percentage(partialValue, totalValue) {
    if(partialValue === 0) return 0;
    return (100 * partialValue) / totalValue;
}

function getMonthDay(date)
{
    let dateSplit = date.split('-')
    return dateSplit[1] + '-' + dateSplit[2]
}

function formatBarDates(dates, datesSelected)
{
    let response = []
    for(let i = 0; i < dates.length; i++)
    {
        let dateFormat = (getMonthDay(datesSelected[i]))
        let dataFormat = {date: dateFormat, people: dates[i]}
        response.push(dataFormat)
    }
    return response
}

function formatLineDates(dates, users, validConnections, datesSelected)
{

    let response = [{id:"productivity", data: []}]

    for(let i = 0; i < dates.length; i++)
    {
        let percent = Math.floor(percentage(dates[i], users.length * validConnections[i]))
        let data = {x: getMonthDay(datesSelected[i]), y: percent}
        response[0].data.push(data)
    }
    return response
}

function formatCalendarDates(dataDict)
{
    let response = []
    for(let data in dataDict)
    {
        response.push(dataDict[data])
    }
    return response
}

function getDefaultHourDataFormat()
{
    return (
    [
        {id: "8:00", data: [], ips: [], users: []},
        {id: "9:00", data: [], ips: [], users: []},
        {id: "10:00", data: [], ips: [], users: []},
        {id: "11:00", data: [], ips: [], users: []},
        {id: "12:00", data: [], ips: [], users: []},
        {id: "13:00", data: [], ips: [], users: []},
        {id: "14:00", data: [], ips: [], users: []},
        {id: "15:00", data: [], ips: [], users: []},
        {id: "16:00", data: [], ips: [], users: []},
        {id: "17:00", data: [], ips: [], users: []},
        {id: "18:00", data: [], ips: [], users: []},
        {id: "19:00", data: [], ips: [], users: []},
        {id: "20:00", data: [], ips: [], users: []},
    ])
}

function formatHourlyAttendance(data, datesSelected)
{
    let response = []

    if(data.length === 0) return response

    for(let i = 0; i < data[0].length; i++)
    {
        let dataItem = []
        for(let j = 0; j < data.length; j++)
        {
            let datesParsed = datesSelected[j].split('-')
            let month = datesParsed[1]
            let day = datesParsed[2]

            dataItem.push(
                {
                    x: `${day}-${month}`, 
                    y: data[j][i].ips.length, 
                    users: data[j][i].users})
        }
        response.push({id: data[0][i].id, data: dataItem})
    }
    return response
}

function getDatesInfo(connections, users, datesSelected)
{
    let usersFormatted = {}
    let usersPresent = []
    let dailyPeople = Array.from({length: datesSelected.length}, (_, i) => [])
    let dailyProductivity = Array.from({length: datesSelected.length}, (_, i) => 0)
    let validConnections = Array.from({length: datesSelected.length}, (_, i) => 0);
    let allPeopleDates = {}

    let hourDataArray = []

    for(let user of users)
    {
        usersFormatted[user.IP] = user.name
    }

    for(let i = 0; i < connections.length; i++)
    {
        let date = connections[i].dateTime.split(' ')[0]
        let isDateSelected = datesSelected.includes(date)
        let index = datesSelected.indexOf(date)
        let allDayUsers = []
        let hourData = getDefaultHourDataFormat()

        while(i < connections.length && connections[i].dateTime.split(' ')[0] === date)
        {
            let time =  connections[i].dateTime.split(' ')[1]
            for(let user of connections[i].users)
            {
                if(!allDayUsers.includes(user))
                {
                    if(allDayUsers.length == 0)
                    {
                        allPeopleDates['d' + date] = {
                            day: date,
                            value: 1
                        }

                    }
                    else
                    {
                        allPeopleDates['d' + date].value += 1
                    }
                    allDayUsers.push(user)
                }
                if(isDateSelected && Object.keys(usersFormatted).includes(user))
                {
                    if(!usersPresent.includes(usersFormatted[user]))
                    {
                        usersPresent.push(usersFormatted[user])
                    }
                    let hour = parseInt(time.split(':')[0])
                    if(hour >= 8 && hour <= 20 && !hourData[hour - 8].ips.includes(user))
                    {
                        if(!hourData[hour - 8].ips.length == 0)

                        hourData[hour - 8].data.push({x: usersFormatted[user], y: 1})
                        hourData[hour - 8].ips.push(user)
                        hourData[hour - 8].users.push(usersFormatted[user])
                    }
                }
            }
            if(isDateSelected)
            {
                validConnections[index] += 1
                dailyProductivity[index] += connections[i].users.length
            }
            i++
        }
        
        if(i < connections.length) i--;

        if(isDateSelected)
        {
            hourDataArray.push(hourData)
            dailyPeople[index].push(allDayUsers.length)
        }
    }

    let response = {
        dailyPeople: formatBarDates(dailyPeople, datesSelected), 
        usersPresent: usersPresent,
        dailyProductivity: formatLineDates(dailyProductivity, users, validConnections, datesSelected),
        calendarData: formatCalendarDates(allPeopleDates),
        hourData: formatHourlyAttendance(hourDataArray, datesSelected)
    }

    // console.log(formatHourlyAttendance(hourDataArray, datesSelected))
    console.log(hourDataArray)

    return response


}

export { getDatesInfo }