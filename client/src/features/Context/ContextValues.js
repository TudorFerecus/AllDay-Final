import { useState } from "react"
import { AppContext } from "./Context"

function ContextProvider(props)
{
    const [datesSelected, setDatesSelected] = useState([])
    const LOCAL_LINK = 'http://192.168.56.1:3000'
    const REMOTE_LINK = 'http://localhost:3000'
    const values = {datesSelected, setDatesSelected, LOCAL_LINK, REMOTE_LINK}

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider