import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

function Button2({buttonText, onClick})
{
    return (
        <button className="button2" onClick={onClick} > 
            {buttonText}
            <FontAwesomeIcon icon={faChartSimple} className = "button2-icon" />
        </button>     
    )
}

export default Button2