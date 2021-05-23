import React from 'react'
import "./Home.scss";
import placeholder from "../../assets/map_placeholder.png";
import { Link } from 'react-router-dom';

export interface Props {
    [key: string]: any
}

const Home = (props: Props) => {

    return (
        <div className = "home">
            <div className="panel">
                <div className="title">
                    Manage Drivers
                </div>
                <div className="actions">
                    <Link to = "/add-driver?type=basic">
                        Add Driver (Basic)
                    </Link>
                    <Link to = "/add-driver?type=advanced">
                        Add Driver (Advanced)
                    </Link>
                </div>
                <div className = "drivers">
                    <p className="label">
                        DRIVER NAME
                    </p>
                    <p className="label">
                        START ADRESS
                    </p>
                    <p className="label">
                        SHIFT
                    </p>
                </div>
            </div>
            <div className="map">
                <img src = {placeholder}/>
            </div>
        </div>
    );
}

 export default Home;