import styleCSS from './style.module.css'

function CalendarItemDay({dayText})
{
    return (
    <div className={styleCSS.grid_item_days}>{dayText}</div>
    )
}

export default CalendarItemDay