import React from 'react'
import "./Home.scss";
import placeholder from "../../assets/map_placeholder.png";
import { Link } from 'react-router-dom';
import { Driver } from '../../utils/types';

export interface Props {
    [key: string]: any
}

const sampleDrivers: Driver[] = [
    {
        name: "Driver 1",
        address: "Bucharest, Romania",
        shift: "08:00"
    },
    {
        name: "Driver 2",
        address: "Bucharest, Romania",
        shift: "08:00"
    }
]

const Home = (props: Props) => {

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
                <p className="label">
                    DRIVER NAME
                </p>
                <p className="label">
                    START ADRESS
                </p>
                <p className="label">
                    SHIFT
                </p>
                {sampleDrivers.map(x => (
                    <>
                        <p className = "data">
                            {x.name}
                        </p>
                        <p className = "data">
                            {x.address}
                        </p>
                        <p className = "data">
                            {x.shift}
                        </p>
                    </>
                ))}
            </div>
        </div>
    );
}

 export default Home;