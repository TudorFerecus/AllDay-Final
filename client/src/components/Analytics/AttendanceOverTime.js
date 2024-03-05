import Card from "./Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import CalendarChart from "./Charts/CalendarChart";

import styleCSS from './style.module.css'


function AttendanceOverTime({data})
{
    return (
        <Card widthSpan='9' cardHeight='49dvh'>
            <FontAwesomeIcon icon={faCalendarDays} className={styleCSS.icon}/>
            <div className={styleCSS.card_title}>Attendance over time</div>
            <div className={styleCSS.calendar_chart}>
            <CalendarChart data={ data }/>
                
            </div>
        </Card>
    );
}

export default AttendanceOverTime;