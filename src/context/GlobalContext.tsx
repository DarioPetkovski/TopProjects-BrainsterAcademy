import { useContext, createContext } from "react";
import { GlobalDataInterface } from "../interfaces/interfaces";

export const GlobalContext = createContext({} as GlobalDataInterface);

export const useGlobalContext = () => useContext(GlobalContext);
