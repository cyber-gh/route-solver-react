import React from 'react'
import "./LeftPanel.scss";
import Logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';

export interface Props {
    [key: string]: any
}

const LeftPanel = (props: Props) => {

    return (
        <div className = "left-panel">
            <div>
                <Link to = '/'>
                    <img src = {Logo}/>
                </Link>
                <Link aria-label = "Routes" to = "/routes">
                    <i className ="fas fa-route"></i>
                </Link>
                <Link aria-label = "Clients" to = "/clients">
                    <i className="fas fa-users"></i>
                </Link>
            </div>
            <div>
                <Link aria-label = "Log out" to = "/logout">
                    <i className ="fas fa-sign-out-alt"></i>
                </Link>
                <Link aria-label = "Profile" to = "/profile">
                    <i className="fas fa-id-badge"></i>
                </Link>
            </div>
        </div>
    );
}

 export default LeftPanel;