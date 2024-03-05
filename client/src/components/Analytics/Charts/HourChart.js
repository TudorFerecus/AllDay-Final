import { ResponsiveHeatMap } from '@nivo/heatmap'

const HourGrid = ({ data, setCaseSelected }) => {
    let maxValue = 0
    for(let i = 0; i < data.length; i++)
    {
        for(let j = 0; j < data[i].data.length; j++)
        {
            if(data[i].data[j].y > maxValue) maxValue = data[i].data[j].y
        }
    }

    maxValue += 1

    return (
    <ResponsiveHeatMap
        data={data}
        theme={{
            text:{
                fontFamily: 'Lexend',
            }
        }}
        margin={{ top: 50, right: 10, bottom: 0, left: 55 }}
        valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46
        }}
        enableLabels={false}
        colors={{
            type: 'diverging',
            scheme: 'greens',
            minValue: 0,
            maxValue: maxValue,
            divergeAt: 0.5
        }}
        hoverTarget="cell"
        emptyColor="#555555"
        onClick={(e) => setCaseSelected(e.data.users)}
        animate={false}
    />
)}

export default HourGrid