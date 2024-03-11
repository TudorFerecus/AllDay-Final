import styleCSS from './style.module.css'
import StatGridItem from "../../../components/StatGridItem/StatGridItem";

import { alertError } from "../../../features/Alerts/alerts";
import { useEffect, useState } from "react";

import {GetStat} from '../../../features/API/API'

import Cookies from 'js-cookie';

function StatsSection()
{
    const [lastOnline, setLastOnline] = useState('10-11-12 10:12');
    const [totalTimeSpent, setTotalTimeSpent] = useState('11 Hours 30 Minutes');
    const [tasksDone, setTasksDone] = useState('0 Tasks');
    const [tasksPending, setTasksPending] = useState('0 Tasks');

    let userEmail = localStorage.getItem("mail")
    let userFormatted = {mail: userEmail, token: Cookies.get('_auth')}
    
    function formatStats(res)
    {
        let totalTimeFormatted;
        if(res.totalTime < 60)
            totalTimeFormatted = res.totalTime + ' Minutes'

        else if(res.totalTime < 1440)
        {
            let hoursText = ' Hours '
            let minutesText = ' Minutes '
            if(Math.floor(parseInt(res.totalTime) / 60) === 1) hoursText = ' Hour '
            if(parseInt(res.totalTime) % 60 === 1) minutesText = ' Minute'
            totalTimeFormatted = Math.floor(parseInt(res.totalTime) / 60) + hoursText
            + (parseInt(res.totalTime) % 60) + minutesText
        }

        else
        {
            let hoursText = ' Hours'
            let daysText = ' Days '
            if(Math.floor(parseInt(res.totalTime) / 60) === 1) hoursText = ' Hour'
            if(Math.floor(parseInt(res.totalTime) / 1440) === 1) hoursText = ' Day '
            
            totalTimeFormatted = Math.floor(parseInt(res.totalTime) / 1440) + daysText 
            + Math.floor((parseInt(res.totalTime) % 1440) / 60) + hoursText
        }

        setLastOnline(res.lastOnline)
        setTotalTimeSpent(totalTimeFormatted)
        setTasksDone((res.tasksDone.length - 1) + ' Tasks')  
        setTasksPending((res.tasksPending.length - 1) + ' Tasks')  
    }

    useEffect(() => {
        if(userEmail)
        {
            GetStat(userFormatted, formatStats, () =>
                alertError("Something went wrong, please Log-in again")
            )
        }
        else
        {
            alertError("Something went wrong, please Log-in again")
        }
    }, [])
    return (
        <div className={styleCSS.stats_section}>
            <div className={styleCSS.stats_title}>
                Statistics
            </div>
            <div className={styleCSS.stats_grid}>
                <StatGridItem text='Last online:'/>
                <StatGridItem text={lastOnline} bold='true'/>
                <StatGridItem text='Total time spent:'/>
                <StatGridItem text={totalTimeSpent} bold='true'/>
                <StatGridItem text='Tasks ' highlightText="done:" color="green"/>
                <StatGridItem text={tasksDone} bold='true'/>
                <StatGridItem text='Tasks ' highlightText="pending:" color="rgb(217, 81, 44)"/>
                <StatGridItem text={tasksPending} bold='true'/>
            </div>
        </div>

    )
}

export default StatsSection