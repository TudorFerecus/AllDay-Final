import { useState } from "react"
import { AppContext } from "./Context"

function ContextProvider(props)
{
    const [datesSelected, setDatesSelected] = useState([])
    const values = {datesSelected, setDatesSelected}

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider