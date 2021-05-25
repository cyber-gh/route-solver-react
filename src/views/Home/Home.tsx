import React, { useContext } from 'react'
import "./Home.scss";
import placeholder from "../../assets/map_placeholder.png";
import { Link } from 'react-router-dom';
import { Driver } from '../../utils/types';
import { Fragment } from 'react';
import { DriverContext } from '../../state/DriverContext';
import { AlertContext } from '../../state/Alert';

export interface Props {
    [key: string]: any
}

const Home = (props: Props) => {
    const {drivers, removeDriver} = useContext(DriverContext);
    const {setAlert} = useContext(AlertContext);

    const handleClick = (x: string) => () => {
        console.log("ceva");
        removeDriver(x);
        setAlert({type: "success", message: "Driver removed successfully."})
    }
    
    return (
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
            <div className = "drivers">
                <p className = "label">
                    {""}
                </p>
                <p className="label">
                    DRIVER NAME
                </p>
                <p className="label">
                    START ADRESS
                </p>
                <p className="label">
                    SHIFT
                </p>
                {drivers.map(x => (
                    <Fragment key = {x.id}>
                        <i className = "data fas fa-times" onClick = {handleClick(x.id)}/>
                        <p className = "data">
                            {x.name}
                        </p>
                        <p className = "data">
                            {x.location}
                        </p>
                        <p className = "data">
                            {x.schedule_begin} - {x.schedule_end}
                        </p>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

 export default Home;