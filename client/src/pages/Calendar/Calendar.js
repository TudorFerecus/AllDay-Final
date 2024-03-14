import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import Button2 from "../../components/Buttons/Button2"
import HeaderCalendar from "../../components/Calendar/HeaderCalendar"
import CalendarDates from "../../components/Calendar/CalendarDates"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import styleCSS from './style.module.css'
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../features/Context/Context"

function Calendar()
{
    function getPreviousMonth()
    {
        if(month.current > 0)
        {
            month.current--;
            setCalendarDates(<CalendarDates date={date} year={year.current} month={month.current}/>)
        }
    }

    function getNextMonth()
    {
        if(month.current < 11)
        {
            month.current++;
            setCalendarDates(<CalendarDates date={date} year={year.current} month={month.current}/>)
        }
    }

    function onClick() 
    {
        navigate('/analytics');
    }

    let date = new Date();
    const year = useRef(date.getFullYear());
    const month = useRef(date.getMonth());
    const monthName = ["-JAN-", "-FEB-", "-MAR-", "-APR-", "-MAY-", "-JUN-", "-JUL-", "-AUG-", "-SEP-", "-OCT-", "-NOV-", "-DEC-"]

    const navigate = useNavigate();
    const [calendarDates, setCalendarDates] = useState(<CalendarDates date={date} year={year.current} month={month.current}/>)
    const {datesSelected, setDatesSelected} = useContext(AppContext)


    useEffect(() => {
        setDatesSelected([])
    }, [])

    return (
        <>
            <Head pageTitle="Pick some dates!"/>
            <Navbar />
            <div className = {styleCSS.main} >
                <div className = {styleCSS.top_main_wrapper}>
                    <div className = {styleCSS.top_main_text}> What days would you like to analyse? </div>
                    <Button2 buttonText="Let's Analyse" onClick={onClick}/>
                </div>
            </div>
            <div className={styleCSS.main_page}>
                <FontAwesomeIcon icon={faChevronLeft} className = {styleCSS.arrow_left}  onClick={getPreviousMonth}/>
                <div className={styleCSS.calendar_wrapper}>
                    <HeaderCalendar />
                    {calendarDates}
                    <h1 className={styleCSS.monthName}> {monthName[month.current]} </h1>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className = {styleCSS.arrow_right} onClick={getNextMonth}/>
            </div>
            <div className={styleCSS.grid_calendar}>
            
            </div>
        </>
    )
}

export default Calendar