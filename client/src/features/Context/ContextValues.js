import { useState } from "react"
import { AppContext } from "./Context"

function ContextProvider(props)
{
    const [datesSelected, setDatesSelected] = useState([])
    const LOCAL_LINK = 'http://192.168.0.88:3000'
    const REMOTE_LINK = 'https://main--all-day.netlify.app'
    const values = {datesSelected, setDatesSelected, LOCAL_LINK, REMOTE_LINK}

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider