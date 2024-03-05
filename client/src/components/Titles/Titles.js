import './style.css'

function Title({titleText, marginBottomTitle = "50px"})
{

    return (
        <div className="title" style={true ? ({ marginBottom: marginBottomTitle }) : ({})} >{titleText}</div>
    )
}

export default Title