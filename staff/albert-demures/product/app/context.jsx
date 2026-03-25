import { createContext, useContext as useContextOriginal} from 'react'

export const Context = createContext()

export const useContext = () => useContextOriginal(Context)