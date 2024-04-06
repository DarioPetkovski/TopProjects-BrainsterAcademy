import { ReactNode, useState } from 'react'
import { ContextInterface, GlobalContext } from './Context'
import { array } from '../../db'

function ContextProvider({children}:{children:ReactNode}) {
    const [darkMode, setDarkMode] = useState<boolean>(false)
    const changeAppMode = () => {
        setDarkMode(prev=>!prev)
    }

  const globalContextObj:ContextInterface = {
    appMode: changeAppMode,
    darkMode:darkMode,
    data:array
  }
  return(
    <GlobalContext.Provider value={globalContextObj}>
    {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider