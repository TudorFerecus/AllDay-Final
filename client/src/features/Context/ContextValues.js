import { useState } from "react"
import { AppContext } from "./Context"

function ContextProvider(props)
{
    const [datesSelected, setDatesSelected] = useState([])
    const LOCAL_LINK = 'http://192.168.0.98:3000'
    const REMOTE_LINK = 'https://main--all-day.netlify.app'
    const DATABASE_LINK = 'https://allday-final.onrender.com/api/v1'
    const values = {datesSelected, setDatesSelected, LOCAL_LINK, REMOTE_LINK, DATABASE_LINK}

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider