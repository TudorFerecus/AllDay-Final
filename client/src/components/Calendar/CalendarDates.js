import { useRef } from 'react';
import CalendarDate from './CalendarDate';
import styleCSS from './style.module.css'


function getDay(year, month)
{
    let day = new Date(year + "-" + month + "-01").getDay()
    day = (day===0) ? 7 : day
    return day;
}

function getDayStatus(nowMonth, date, month, day)
{
    if(nowMonth === month)
    {
        if(day > date.getDate()) return true;
        else return false;
    }
    else if(nowMonth > month)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function CalendarDates({ date, year, month})
{
    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    monthDays[1] = (year % 4 === 0) ? 29 : monthDays[1];
    const days = Array.from({ length: monthDays[month] }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: getDay(year, month + 1) - 1}, (_, i) => i + 1);

    const nowMonth = useRef(date.getMonth());

    
    return (
        <div className={styleCSS.grid_calendar}>
            {emptyDays.map((day) => (
                    <div key={day}></div>
                ))
            }

            {days.map((day) => (
                <CalendarDate 
                    key={day}
                    day={day} 
                    isFuture={(getDayStatus(nowMonth.current, date, month, day))? false : true}
                    month={month}
                    year={year}
                />
            ))}
        </div>
    )
}

export default CalendarDates