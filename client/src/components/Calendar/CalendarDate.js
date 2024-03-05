import React, { useRef } from 'react';
import styleCSS from './style.module.css';
import {AppContext} from '../../features/Context/Context';
import { useContext } from 'react';

function formatDate(date) {
    if(date < 10) return "0" + date;
    return date;
}

const CalendarDate = ({ day, isFuture, month, year}) => {

    const [styleColor, setStyleColor] = React.useState('none');
    const clicked = useRef(false, [])

    
    const {datesSelected, setDatesSelected} = useContext(AppContext);

    function onClick() {
        if (isFuture) 
        {
            clicked.current = !clicked.current;
            if(clicked.current)
            {
                let formattedDay = formatDate(day);
                let formattedMonth = formatDate(month + 1);
                setDatesSelected([...datesSelected, (year + "-" + formattedMonth + "-" + formattedDay)])
                setStyleColor('#3da35d')
            }

            else
                setStyleColor('rgba(0, 0, 0, 0)')
        }
    }


    return (
        <div className={styleCSS.grid_item_calendar}>
            <span onClick={onClick} style={{ backgroundColor: styleColor }} className={isFuture? 
                styleCSS.inner_calendar_item :
                styleCSS.inner_calendar_item_disabled}
                onMouseEnter={() => {if(!clicked.current) setStyleColor('rgba(0, 0, 0, 0.2)')}}
                onMouseLeave={() => {if(!clicked.current) setStyleColor('rgba(0, 0, 0, 0.0)')}}
                >
                {day}
            </span>
        </div>
    );
};

export default CalendarDate;
