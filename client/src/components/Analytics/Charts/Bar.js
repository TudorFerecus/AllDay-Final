import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ data }) => {
    let colorScheme = {"id0": "#E8C1A0", "id1": "#F47560", "id2": "#F1E15B", "id3": "#E8A838", "id4": "#61CDBB", "id5": "#3C55A4", "id6": "#CB2829", "id7": "#FED98B", "id8": "brown", "id9": "grey", "id10": "black"};
    const getColor = (e) => {
        return colorScheme["id" + e.index]
    }
    return (
    <ResponsiveBar
        colors={getColor}
        theme={{
            "background": "#e2e6dd",
            "text": {
                "fontFamily": "Lexend, sans-serif",
                "fontSize": 12,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            },
            "grid": {
                "line": {
                    "stroke": "#dddddd",
                    "strokeWidth": 3
                }
            }
        }}
        data={data}
        keys={[
            'people'
        ]}
        indexBy="date"
        margin={{ top: 10, right: 0, bottom: 20, left: 40 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 2,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '2.9'
                ]
            ]
        }}
        role="application"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)}

export default BarChart