import React, { useEffect, useState } from "react";
import usePersistentState from "../utils/usePersistentState";
import {Client} from "../utils/types";

interface Props {
    selectedRouteId: string | undefined
    setSelectedRoute: (id: string) => void
    clearRouteId: () => void
}

export const DeliveryRouteContext = React.createContext<Props>({
    selectedRouteId: undefined,
    setSelectedRoute: (id: string) => null,
    clearRouteId: () => null
})

export const DeliveryRouteProvider = ({ children, ...props }: {children: any}) => {
    const [routeId, setRouteId] = usePersistentState <string | undefined> ("selected-route", undefined);

    const setSelectedRoute = (id: string) => {
        setRouteId(id)
    }

    const clearRouteId = () => {
        setRouteId(undefined)
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
