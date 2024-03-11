import styleCSS from './style.module.css'

import useWindowSize from '../../hooks/useResizeWindow'

function StatGridItem({text, highlightText, color, bold})
{
    let [windowSize, setWindowSize] = useWindowSize()
    let fontWheight = '400'
    let fontSize = windowSize > 600? '1.18rem' : '.8rem'

    if(bold)
    {
        fontWheight = '500'
        fontSize = windowSize > 600? '1.35rem' : '.92rem'
    }

    return (
        <span className={styleCSS.stat_grid_item} style={{fontWeight: `${fontWheight}`, fontSize: `${fontSize}`}}>
            {text}
            {
                highlightText?
                <span className={styleCSS.stat_grid_item_hightlight} style={{color:`${color}`, fontSize: `${fontSize}`}}>
                    {highlightText}
                </span> :
                <></>
            }
        </span>
    )
}

export default StatGridItem;