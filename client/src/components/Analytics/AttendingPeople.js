import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import StickyList from "../Lists/StickyList";

import styleCSS from './style.module.css'
import chartsCSS from './Charts/charts.module.css'

function AttendingPeople({users, percentage}) 
{
    return (
        <Card widthSpan='4' cardHeight='23dvh'>
            <FontAwesomeIcon icon={faUsers} className={styleCSS.icon}/>
            <div className={styleCSS.card_title}>Attending People</div>
            <div className={styleCSS.main_wrapper}>
                <div className={`${chartsCSS.pie} ${chartsCSS.animate}`} style={{"--p":`${percentage}`, "--c":'#3da35d'}}> {percentage}%</div>
                {users.length === 0? <div>No users present in this time period</div> :
                <StickyList users={users}/>
                }   
            </div>
        </Card>
        
    )
}

export default AttendingPeople;