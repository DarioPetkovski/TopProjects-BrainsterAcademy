import { useContext, createContext } from "react";
import { CardInterface } from "../../db";

export interface ContextInterface {
    appMode:()=>void
    darkMode:boolean
    data:CardInterface[]
}

export const GlobalContext = createContext({} as ContextInterface)

export const useGlobalContext = () => useContext(GlobalContext)