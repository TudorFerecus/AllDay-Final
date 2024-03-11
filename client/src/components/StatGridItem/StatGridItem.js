import styleCSS from './style.module.css'

function StatGridItem({text, highlightText, color, bold})
{
    let fontWheight = '400'
    let fontSize = '1.18rem'

    if(bold)
    {
        fontWheight = '500'
        fontSize = '1.35rem'
    }

    return (
        <span className={styleCSS.stat_grid_item} style={{fontWeight: `${fontWheight}`, fontSize: `${fontSize}`}}>
            {text}
            {
                highlightText?
                <span className={styleCSS.stat_grid_item_hightlight} style={{color:`${color}`}}>
                    {highlightText}
                </span> :
                <></>
            }
        </span>
    )
}

export default StatGridItem;