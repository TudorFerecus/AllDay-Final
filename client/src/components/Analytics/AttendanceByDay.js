import Card from "./Card";
import BarChart from "./Charts/Bar";
import {barData} from "./Charts/data";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquarePollVertical} from '@fortawesome/free-solid-svg-icons'

import styleCSS from './style.module.css'

function AttendenceByDay({data})
{
    return (
        <Card widthSpan='4' cardHeight='23dvh'>
            <FontAwesomeIcon icon={faSquarePollVertical} className={styleCSS.icon}/>
            <div className={styleCSS.card_title}>Attendance by Day</div>
            <div className={styleCSS.bar_chart}>
                <BarChart data={data}/>
            </div>
        </Card>
    )
}

export default AttendenceByDay;
