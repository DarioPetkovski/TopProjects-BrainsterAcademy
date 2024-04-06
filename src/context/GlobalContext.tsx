import { useContext,createContext } from "react";
import { ContextData } from "../interfaces/interfaces";

export const GlobalContext = createContext({} as ContextData)

export const useGlobalContext = () => useContext(GlobalContext)