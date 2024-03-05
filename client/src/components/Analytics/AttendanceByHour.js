import Card from "./Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClock} from '@fortawesome/free-solid-svg-icons'
import HourGrid from './Charts/HourChart';
import StickyList from "../Lists/StickyList.js";

import styleCSS from './style.module.css'

import { useState } from "react";

function AttendanceByHour({data})
{
    const [caseSelected, setCaseSelected] = useState([])
    return (
        <Card widthSpan='3'>
            <FontAwesomeIcon icon={faClock} className={styleCSS.icon}/>
            <div className={styleCSS.card_title}>Attendance by hour</div>
            <div className={styleCSS.hour_chart}>
                <HourGrid data={data} setCaseSelected={setCaseSelected}/>    
            </div>
            <div className={styleCSS.hour_wrapper}>
                {caseSelected.length? 
                    <StickyList selectedMaxHeight='13dvh' users={caseSelected}/> :
                    <div style={{width: '50%', textAlign: "center"}}>Select a box to see all the people who attended in that hour</div>
                }        
            </div>
        </Card>
    );
}

export default AttendanceByHour;