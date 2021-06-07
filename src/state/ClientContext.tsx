
import React, { useEffect, useState } from "react";
import { Client, Driver, Unique } from "../utils/types";
import usePersistentState from "../utils/usePersistentState";

interface Props {
    clients: Client[],
    addClient: (x: Client) => void,
    removeClient: (id: string) => void,
    updateClient: (id: string, x: Client) => void,
    setClients: (clients: Client[]) => void
}

export const ClientContext = React.createContext <Props> ({
    clients: [],
    addClient: () => null,
    removeClient: () => null,
    updateClient: (id: string, x: Client) => null,
    setClients: (clients: Client[]) => null
});


export const ClientProvider = ({ children, ...props }: {children: any}) => {
    const [clients, setClients] = usePersistentState <Client[]> ("client-data", []);

    const addClient = (x: Client) => {
        let temp = clients;
        temp.push(x);
        setClients(temp);
    }

    const removeClient = (id: string) => {
        let temp = clients.filter(x => x.id !== id);
        setClients(temp);
    }

    const updateClient = (id: string, x: Client) => {
        let temp = clients.map(it => it.id === id ? x: it);
        setClients(temp);
    }


    return (
        <ClientContext.Provider
            value={{ 
                clients,
                addClient,
                removeClient,
                updateClient,
                setClients
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
