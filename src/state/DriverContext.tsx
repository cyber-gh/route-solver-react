
import React, { useEffect, useState } from "react";
import { Driver, Unique } from "../utils/types";
import usePersistentState from "../utils/usePersistentState";
import {client} from "../api/ApiClient";
import {gql} from "@apollo/client";

interface Props {
    getDriver: (idx: string) => Driver | null
}

export const DriverContext = React.createContext <Props> ({
    getDriver: (idx: string) => null
});


export const DriverProvider = ({ children, ...props }: {children: any}) => {
    const getDriver = (idx: string) => {
        let driver = client.readFragment({
            id: "DeliveryDriver:" + idx,
            fragment: gql`
                fragment MyClient on DeliveryDriver {
                    id
                    name
                    email
                    location {
                        address
                        latitude
                        longitude
                    }
                }
            `
        })

        return driver
    }


    return (
        <DriverContext.Provider
            value={{
                getDriver
            }}
        >
            {children}
        </DriverContext.Provider>
    );
};
