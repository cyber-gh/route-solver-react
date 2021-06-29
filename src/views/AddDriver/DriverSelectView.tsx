import React, {useContext, useEffect, useState} from 'react'
import "../Home/Home.scss";
import { Fragment } from 'react';
import { AlertContext } from '../../state/Alert';
import {DRIVERS_QUERY, ROUTE_WITH_ORDERS} from "../../api/Queries";
import {LinearProgress} from "@material-ui/core";
import useQueryAlert from '../../utils/useQueryAlert';
import {RouteMapContext} from "../../state/MapContext";
import {useMutation} from "@apollo/client";
import {ASSIGN_ROUTE_DRIVER} from "../../api/Mutations";
import {DeliveryRouteContext} from "../../state/RouteContext";

export interface Props {
    [key: string]: any
}

const DriversSelectView = (props: Props) => {
    const {setAlert} = useContext(AlertContext);
    useEffect(props.open, []);
    const {route} = useContext(RouteMapContext);
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const {loading,  data} = useQueryAlert(DRIVERS_QUERY);
    const [assignDriver, {loading: assignLoading}] = useMutation(ASSIGN_ROUTE_DRIVER, {
        onError: (e) => {
            setAlert({type: "error", message: e.message})
        },
        onCompleted: () => {
            setAlert({type: "success", message: "Driver assigned successfully."})
        }
    });
    // let selected = route?.findRoute?.selectedDriverId;

    let [selected, setSelected] = useState<string | undefined>(undefined);
    useEffect(() => {
        setSelected(route?.findRoute?.selectedDriverId ?? undefined);
    }, []);

    let drivers = []
    if (data) {
        drivers = data.drivers
    }


    const handleClick = (x: string) => async () => {
        await assignDriver({
            variables: {
                routeId: selectedRouteId,
                driverId: x
            }
        })
        setSelected(x)
    }

    return (
        <>
            {/* <ConfirmDialogue action =  */}
            <div className = "home">
                <div className="title">
                    Assign Driver
                </div>
                {loading || assignLoading && <LinearProgress />}
                <div className = "drivers" style = {{gridTemplateColumns: "minmax(20px, auto) minmax(20px, auto) minmax(20px, auto) minmax(20px, auto)"}}>
                    <p className="label">
                        DRIVER NAME
                    </p>
                    <p className="label">
                        START ADRESS
                    </p>
                    <p className="label">
                        Email
                    </p>
                    <p className = "label">
                        {""}
                    </p>
                    {drivers.map((x: any) => (

                        <Fragment key = {x.id}>

                            <p className = "data">
                                {x.name}
                            </p>
                            <p className = "data">
                                {x.location.address}
                            </p>
                            <p className = "data oneline">
                                {x.email}
                                {/*{x.id === selected ? "yes" : "no"}*/}
                            </p>
                            <div className = "data">
                                {/*{x.id}*/}
                                {x.id === selected ?
                                    <p style = {{color: "forestgreen", padding: "15px"}}>Assigned</p> :
                                    <button className={"btn"} onClick = {handleClick(x.id)}>Assign</button>
                                }
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DriversSelectView;
