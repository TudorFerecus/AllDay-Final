import { useState } from "react"
import { AppContext } from "./Context"

function ContextProvider(props)
{
    const [datesSelected, setDatesSelected] = useState([])
    const LOCAL_LINK = 'http://10.41.238.53:3000'
    const REMOTE_LINK = 'https://main--all-day.netlify.app'
    const values = {datesSelected, setDatesSelected, LOCAL_LINK, REMOTE_LINK}

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider