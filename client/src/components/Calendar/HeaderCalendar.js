import styleCSS from './style.module.css'
import CalendarItemDay from './CalendarItemDay'

function HeaderCalendar()
{
    return (
        <div className={styleCSS.grid_days}>
            <CalendarItemDay dayText="MON"/>
            <CalendarItemDay dayText="TUE"/>
            <CalendarItemDay dayText="WED"/>
            <CalendarItemDay dayText="THU"/>
            <CalendarItemDay dayText="FRI"/>
            <CalendarItemDay dayText="SAT"/>
            <CalendarItemDay dayText="SUN"/>
        </div>
    )
}

export default HeaderCalendar