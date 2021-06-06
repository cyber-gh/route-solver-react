import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import {getConfig} from "../config";
import history from "./history";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)
const config = getConfig();




const getAuth0Client = () => {
    return new Promise(async (resolve, reject) => {
        let client
        if (!client)  {
            try {
                client = await createAuth0Client({
                    domain: config.domain,
                    client_id: config.clientId,
                    audience: config.audience
                })
                resolve(client)
            } catch (e) {
                reject(new Error('getAuth0Client Error', e))
            }
        }
    })
}

export const getTokenSilently = async (...p) => {
    const client = await getAuth0Client()
    return await client.getTokenSilently(...p)
}
