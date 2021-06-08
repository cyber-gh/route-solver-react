import React, {useContext, useEffect, useState} from "react";
import usePersistentState from "../utils/usePersistentState";
import {Client} from "../utils/types";
import {RouteMapContext} from "./MapContext";

interface Props {
    selectedRouteId: string
    setSelectedRoute: (id: string) => void
    clearRouteId: () => void
}

export const DeliveryRouteContext = React.createContext<Props>({
    selectedRouteId: "",
    setSelectedRoute: (id: string) => null,
    clearRouteId: () => null
})

export const DeliveryRouteProvider = ({ children, ...props }: {children: any}) => {
    const {clearRoute, clearSolution} = useContext(RouteMapContext);
    const [routeId, setRouteId] = usePersistentState <string> ("selected-route-idx", "");

    const setSelectedRoute = (id: string) => {
        setRouteId(id)
    }

    const clearRouteId = () => {
        setRouteId("")
        clearRoute()
        clearSolution()
    }

    return (
        <DeliveryRouteContext.Provider
        value={{
            selectedRouteId: routeId,
            setSelectedRoute,
            clearRouteId
        }}>

            {children}
        </DeliveryRouteContext.Provider>
    )
}
