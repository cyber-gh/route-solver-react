import React, {useState} from "react";
import {findRoute} from "../api/__generated__/findRoute";
import usePersistentState from "../utils/usePersistentState";


interface Props {
    route: findRoute | undefined
    setCurrentRoute: (r: findRoute) => void
    clearRoute: () => void
}

export const RouteMapContext = React.createContext<Props>({
    route: undefined,
    setCurrentRoute: (r: findRoute) => null,
    clearRoute:() => null
})

export const MapProvider = ({ children, ...props }: {children: any}) => {
    const [route, setRoute] = useState<findRoute | undefined>(undefined)

    const setCurrentRoute = (route: findRoute) => {
        setRoute(route)
    }

    const clearRoute = () => {
        setRoute(undefined)
    }

    return (
        <RouteMapContext.Provider
            value={{
            route,
            setCurrentRoute,
            clearRoute}
            }
        >
            {children}
        </RouteMapContext.Provider>
    )
}
