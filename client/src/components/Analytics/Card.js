import styleCSS from './style.module.css'

function Card(props)
{
    let widthSpan = props.widthSpan;
    let cardHeight = props.cardHeight;
    return (
    <div className={styleCSS.card}
        style={{
            gridColumn: `span ${widthSpan}`,
            height: `${cardHeight}`
        }}
    >
        {props.children}
    </div>
    )
}

export default Card;