import React, {useContext, useEffect, useState} from 'react'
import "../Home/Home.scss";
import { Fragment } from 'react';
import { AlertContext } from '../../state/Alert';
import {DRIVERS_QUERY} from "../../api/Queries";
import {LinearProgress} from "@material-ui/core";
import useQueryAlert from '../../utils/useQueryAlert';
import {RouteMapContext} from "../../state/MapContext";

export interface Props {
    [key: string]: any
}

const DriversSelectView = (props: Props) => {
    const {setAlert} = useContext(AlertContext);
    useEffect(props.open, []);
    const {route} = useContext(RouteMapContext);
    const {loading,  data} = useQueryAlert(DRIVERS_QUERY);
    let selected = route?.findRoute?.selectedDriverId;

    let drivers = []
    if (data) {
        drivers = data.drivers
    }


    const handleClick = (x: string) => () => {

    }

    console.log("Selected driver is");
    console.log(selected);

    return (
        <>
            {/* <ConfirmDialogue action =  */}
            <div className = "home">
                <div className="title">
                    Assign Driver
                </div>
                {loading && <LinearProgress />}
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
