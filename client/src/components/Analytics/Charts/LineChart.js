import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data }) =>
{
    return (
        <ResponsiveLine
                theme={{
                    text:{
                        fontFamily: 'Lexend',
                    }
                }}
                data={data}
                margin={{ top: 10, right: 20, bottom: 30, left: 30 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                colors={{ scheme: 'accent' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 10,
                    tickRotation: 0,
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                
            />
    )
}

export default LineChart;