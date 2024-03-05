import './style.css'

function Input({inputName = "Name", inputPlaceholder = "text", onChange, inputType})
{
    return (
        <div className = "input-wrapper">
            <div className="input-text">{inputName}</div>
            <input className="input-form" type={inputType} placeholder={inputPlaceholder} onChange = {onChange}></input>
        </div>

    )
}

export default Input