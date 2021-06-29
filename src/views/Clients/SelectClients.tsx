import {useMutation, useQuery} from '@apollo/client';
import React, { Fragment, useContext, useEffect } from 'react'
import {CLIENTS_QUERY, ROUTE_WITH_ORDERS} from '../../api/Queries';
import { AlertContext } from '../../state/Alert';
import usePersistentState from '../../utils/usePersistentState';
import CustomCheckbox from './CustomCheckbox';
import {DeliveryRouteContext} from "../../state/RouteContext";
import {ADD_ORDER_FROM_CLIENT} from "../../api/Mutations";
import {LinearProgress} from "@material-ui/core";
import {clients, clients_clients} from "../../generated/clients";

export interface Props {
    [key: string]: any
}

const SelectClients = (props: Props) => {
    const {loading, error, data} = useQuery <clients>(CLIENTS_QUERY)
    const [checked, setChecked] = usePersistentState <{[key:string]: boolean | undefined}> ("selected-clients", {});
    const {setAlert} = useContext(AlertContext);

    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const [addOrders, { loading: importLoading}] = useMutation(ADD_ORDER_FROM_CLIENT, {
        refetchQueries: [{
            query: ROUTE_WITH_ORDERS,
            variables: {
                id: selectedRouteId
            }
        }],
        onError: (e) => {
            setAlert({type: "error", message: e.message})
        },
        onCompleted: () => {
            setAlert({type: "success", message: "Clients added successfully."})
        }
    })

    useEffect(props.open, []);

    useEffect(() => {
        if (error) {
            setAlert({type: "error", message: "Error fetching clients " + error.message})
        }
    }, [error])

    let clients:clients_clients[] = [];
    if (data) {
        clients = data.clients
    }

    const handleClick = (x: string) => () => {
        setChecked({
            ...checked,
            [x]: !checked[x]
        })
    }

    const handleDone = async () => {
        let ids = [];
        for (const [key, value] of Object.entries(checked)) {
            if (value) ids.push(key);
        }

        await addOrders({
            variables: {
                routeId: selectedRouteId,
                clientIds: ids
            }
        })

    }

    return (
        <div className = "home">
            <div className="title">
                Select Clients
            </div>
            {(loading || importLoading) && <LinearProgress />}
            <div className = "drivers sel">
                    <p className = "label">
                        {""}
                    </p>
                    <p className="label">
                        CLIENT NAME
                    </p>
                    <p className="label">
                        EMAIL
                    </p>
                    <p className="label">
                        ADDRESS
                    </p>

                    {clients.map((x: any) => (
                        <Fragment key = {x.id}>
                            <CustomCheckbox onChange = {handleClick(x.id)} value = {!!checked[x.id]}/>
                            <p className = "data">
                                {x.name}
                            </p>
                            <p className = "data">
                                {x.email}
                            </p>
                            <p className = "data oneline">
                                {x.location.address}
                            </p>
                        </Fragment>
                    ))}
                </div>
            {clients.length > 0 && <button onClick={() => handleDone()} className = "btn" style = {{margin: "30px auto 0 10px"}}>Done</button>}
        </div>
    );
}

 export default SelectClients;
