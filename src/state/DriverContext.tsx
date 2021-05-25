
import React, { useEffect, useState } from "react";
import { Driver, Unique } from "../utils/types";
import usePersistentState from "../utils/usePersistentState";

interface Props {
    drivers: Driver[],
    addDriver: (x: Driver) => void,
    removeDriver: (id: string) => void,
}

export const DriverContext = React.createContext <Props> ({
    drivers: [],
    addDriver: () => null,
    removeDriver: () => null,
});


export const DriverProvider = ({ children, ...props }: {children: any}) => {
    const [drivers, setDrivers] = usePersistentState <Driver[]> ("driver-data", []);

    const addDriver = (x: Driver) => {
        let temp = drivers;
        temp.push(x);
        setDrivers(temp);
    }

    const removeDriver = (id: string) => {
        let temp = drivers.filter(x => x.id !== id);
        setDrivers(temp);
    }

    return (
        <DriverContext.Provider
            value={{ 
                drivers,
                addDriver,
                removeDriver
            }}
        >
            {children}
        </DriverContext.Provider>
    );
};