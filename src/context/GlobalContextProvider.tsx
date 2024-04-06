import { ReactNode, useEffect, useState } from "react"
import { GlobalContext } from "./GlobalContext"
import { ContextData, Restoraunt } from "../interfaces/interfaces"

function GlobalContextProvider({children}:{children:ReactNode}) {
    const [data,setData] = useState<Restoraunt[]>([])
    const [favorites,setFavorites] = useState<Restoraunt[]>([])
    const [err,setErr] = useState<string>()

    useEffect(() => {
        fetch("http://localhost:5001/restaurants")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data from the server');
                }
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => setErr(err.message));
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const globalData:ContextData = {
        data:data,
        favorites:favorites,
        setData:setData,
        setFavorites:setFavorites,
        err:err
    }
  return (
    <GlobalContext.Provider value={globalData}>
    {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider