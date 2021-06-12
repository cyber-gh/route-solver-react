import React, { useContext, useEffect } from 'react'
import "./Home.scss";
import placeholder from "../../assets/map_placeholder.png";
import { Link } from 'react-router-dom';
import { Driver } from '../../utils/types';
import { Fragment } from 'react';
import { DriverContext } from '../../state/DriverContext';
import { AlertContext } from '../../state/Alert';
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "@apollo/client";
import {DRIVERS_QUERY} from "../../api/Queries";
import {LinearProgress} from "@material-ui/core";
import useQueryAlert from '../../utils/useQueryAlert';
import ConfirmDialogue from '../ConfirmDialogue';

export interface Props {
    [key: string]: any
}

const DriversView = (props: Props) => {
    const {setAlert} = useContext(AlertContext);
    useEffect(props.open, []);
    const {loading,  data} = useQueryAlert(DRIVERS_QUERY);

    let drivers = []
    if (data) {
        drivers = data.drivers
    }


    const handleClick = (x: string) => () => {
        setAlert({type: "warning", message: "Not available."})
    }

    const handleEdit = (x: string) => () => {
        props.history.push("/edit-driver/" + x);
    }
    
    return (
        <>
            {/* <ConfirmDialogue action =  */}
            <div className = "home">
                <div className="title">
                    Manage Drivers
                </div>
                <div className="actions">
                    <Link to = "/add-driver/basic">
                        Add Driver (Basic)
                    </Link>
                    <Link to = "/add-driver/advanced">
                        Add Driver (Advanced)
                    </Link>
                </div>
                {loading && <LinearProgress />}
                <div className = "drivers">
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
                            </p>
                            <div className = "data i-data" onClick = {handleClick(x.id)}>
                                <i className = "far fa-trash-alt"/>
                            </div>
                            <div className = "data i-data" onClick = {handleEdit(x.id)}>
                                <i className ="far fa-edit"/>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}

 export default DriversView;
