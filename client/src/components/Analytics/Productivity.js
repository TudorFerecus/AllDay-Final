import Card from "./Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquarePollVertical} from '@fortawesome/free-solid-svg-icons'

import LineChart from "./Charts/LineChart";

import styleCSS from './style.module.css'

function Productivity({data})
{
    return (
        <Card widthSpan='4' cardHeight='23dvh'>
            <FontAwesomeIcon icon={faSquarePollVertical} className={styleCSS.icon}/>
            <div className={styleCSS.card_title}>Productivity</div>
            <div className={styleCSS.line_chart}>
                <LineChart data={data}/>
            </div>
        </Card>
    )
}

export default Productivity;