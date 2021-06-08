import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import React, { useContext, useEffect } from "react";
import { AlertContext } from "../state/Alert";

const useQueryAlert = <T = any> (query: DocumentNode, variables?: object): {loading: boolean, data: T} => {
    const {setAlert} = useContext(AlertContext);
    const {loading, error, data} = useQuery(query, variables);

    useEffect(() => {
        if (error) {
            setAlert({type: "error", message: error.message})
        }
    }, [error])

    return {
        loading,
        data
    }
}

export default useQueryAlert;
