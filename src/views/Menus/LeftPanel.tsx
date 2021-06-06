import React from 'react'
import "./LeftPanel.scss";
import Logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

export interface Props {
    [key: string]: any,
    toggleColorMode: () => void
}

const LeftPanel = ({toggleColorMode}: Props) => {

    const { logout } = useAuth0();

    return (
        <div className = "left-panel">
            <div>
                <Link to = '/' className = "first">
                    <i className = "fas fa-car"></i>
                </Link>
                <Link aria-label = "Routes" to = "/routes">
                    <i className ="fas fa-route"></i>
                </Link>
                <Link aria-label = "Clients" to = "/clients">
                    <i className="fas fa-users"></i>
                </Link>
            </div>
            <div>
                <a onClick = {toggleColorMode} className = "click">
                    <i className ="far fa-lightbulb"></i>
                </a>
                <a aria-label = "Log out" onClick={() =>{
                    logout({returnTo: "http://localhost:3001"})
                } }>
                    <i className ="fas fa-sign-out-alt"></i>
                </a>
                <Link aria-label = "Profile" to = "/profile">
                    <i className="fas fa-id-badge"></i>
                </Link>
            </div>
        </div>
    );
}

 export default LeftPanel;
