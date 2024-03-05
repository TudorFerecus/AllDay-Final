import './style.css'

function Button1({buttonText = "text", onClick})
{
    return (
        <button className="button1" onClick = {onClick? onClick : null}> {buttonText} </button>
    )
}

export default Button1