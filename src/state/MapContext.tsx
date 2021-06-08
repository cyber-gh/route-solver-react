import React, {useState} from "react";
import {findRoute} from "../generated/findRoute";
import usePersistentState from "../utils/usePersistentState";
import {
    findRouteWithSolutions,
    findRouteWithSolutions_findRoute_solutions
} from "../generated/findRouteWithSolutions";


interface Props {
    route: findRoute | undefined
    solution: findRouteWithSolutions_findRoute_solutions | undefined
    setCurrentRoute: (r: findRoute) => void
    clearRoute: () => void
    setSolution: (sol: findRouteWithSolutions_findRoute_solutions) => void
    clearSolution: () => void
}

export const RouteMapContext = React.createContext<Props>({
    route: undefined,
    solution: undefined,
    setCurrentRoute: (r: findRoute) => null,
    clearRoute:() => null,
    setSolution: (sol: findRouteWithSolutions_findRoute_solutions) => null,
    clearSolution: () => null
})

export const MapProvider = ({ children, ...props }: {children: any}) => {
    const [route, setRoute] = usePersistentState<findRoute | undefined>("selected-route",undefined)
    const [sol, setSol] = usePersistentState<findRouteWithSolutions_findRoute_solutions | undefined>("selected-solution", undefined)

    const setCurrentRoute = (route: findRoute) => {
        setRoute(route)
    }

    const clearRoute = () => {
        setRoute(undefined)
    }
    const setSolution = (s: findRouteWithSolutions_findRoute_solutions) => {
        setSol(s)
    }

    const clearSolution = () => {
        setSol(undefined)
    }

    return (
        <RouteMapContext.Provider
            value={{
            route,
            solution: sol,
            setCurrentRoute,
            clearRoute,
            setSolution,
            clearSolution}
            }
        >
            {children}
        </RouteMapContext.Provider>
    )
}
