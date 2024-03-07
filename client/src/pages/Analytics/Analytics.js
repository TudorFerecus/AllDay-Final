import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import styleCSS from './style.module.css'

import AttendingPeople from "../../components/Analytics/AttendingPeople";
import AttendenceByDay from "../../components/Analytics/AttendanceByDay";
import Productivity from "../../components/Analytics/Productivity";
import AttendanceByHour from "../../components/Analytics/AttendanceByHour";
import AttendanceOverTime from "../../components/Analytics/AttendanceOverTime";
import { AppContext } from "../../features/Context/Context"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertSuccessful } from "../../features/Alerts/alerts"; 
import { GetAllConnectionsAPI, GetAllUsersAPI } from "../../features/API/API";
import { getDatesInfo } from "../../features/Analytics/Analytics";

function percentage(partialValue, totalValue) {
    if(partialValue === 0) return 0;
    return (100 * partialValue) / totalValue;
}

function Analytics() {
    let {datesSelected, setDatesSelected} = useContext(AppContext)

    let dates = datesSelected;
    setDatesSelected(dates.sort());
    const navigate = useNavigate();
    let users = []
    const [usersPresent, setUsersPresent] = useState([])
    const [userPercentage, setuserPercentage] = useState('0')
    const [dailyPeople, setDailyPeople] = useState([ {"date": "12/12", "people": 0} ])
    const [dailyProductivity, setDailyProductivity] = useState([{id: "productivity", data: [{"x": "plane", "y": 85}]}])
    const [calendarData, setCalendarData] = useState([{value: 1, day:"2024-12-12"}])
    const [hourData, setHourData] = useState([])

    const onResponseUsers = (res) => {
        users = []
        for(let user of res) users.push(user)

        GetAllConnectionsAPI(onResponseConnections, onError)
    }
    const onResponseConnections = (res) => {
        let response = getDatesInfo(res, users, datesSelected)
        let usersResponse = response.usersPresent;
        let dailyPeopleResponse = response.dailyPeople;
        let dailyProductivityResponse = response.dailyProductivity
        let calendarDataResponse = response.calendarData
        let hourDataResponse = response.hourData

        setDailyPeople(dailyPeopleResponse)

        setUsersPresent(usersResponse)

        setDailyProductivity(dailyProductivityResponse)

        setuserPercentage(percentage(usersResponse.length, users.length).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0])

        setCalendarData(calendarDataResponse)
    
        setHourData(hourDataResponse)
    }

    const onError = () => {
        console.log("Error")
    }

    useEffect(() => {
        if(datesSelected.length === 0) {
            alertSuccessful("Please select some dates to analyse")
            navigate('/calendar')
        }    
        GetAllUsersAPI(onResponseUsers, onError)
        
    }, [])

    return (
        <div>
            <Head pageTitle="Analyse"/>
            <div className={styleCSS.page}>
                <Navbar />
                <div className = {styleCSS.main} >
                    <div className={styleCSS.grid}>
                        <AttendingPeople users={usersPresent} percentage={userPercentage}/>
                        <AttendenceByDay data={dailyPeople}/>
                        <Productivity data={dailyProductivity}/>
                        <AttendanceOverTime data={calendarData}/>
                        <AttendanceByHour 
                            data={hourData}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;