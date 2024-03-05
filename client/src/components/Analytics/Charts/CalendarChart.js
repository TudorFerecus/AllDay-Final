import { ResponsiveCalendar } from '@nivo/calendar'

const CalendarChart = ({ data }) => (
    <ResponsiveCalendar
        theme={{
            text:{
                fontFamily: 'Lexend',
            }
        }}
        data={data}
        from="2023-01-01"
        to="2024-12-31"
        emptyColor="#d8d5d5"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
        yearSpacing={35}
        monthSpacing={18}
        monthBorderWidth={1}
        monthBorderColor="#e2e6dd"
        dayBorderWidth={3}
        dayBorderColor="#e2e6dd"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
)

export default CalendarChart