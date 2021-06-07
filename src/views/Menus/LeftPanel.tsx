import React, {useContext} from 'react'
import "./LeftPanel.scss";
import Logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import {DeliveryRouteContext} from "../../state/RouteContext";

export interface Props {
    [key: string]: any,
    toggleColorMode: () => void
}

const LeftPanel = (props: Props) => {

    const {toggleColorMode} = props
    const { logout } = useAuth0();
    const {selectedRouteId, clearRouteId} = useContext(DeliveryRouteContext);

    return (
        <div className = "left-panel">
            <div>
                <Link to = '/' className = "first">
                    <i className = "fas fa-car"></i>
                </Link>

                {!selectedRouteId &&
                    <>
                    <Link aria-label="Routes" to="/routes">
                        <i className="fas fa-route"></i>
                    </Link>

                    <Link aria-label = "Drivers" to = "/drivers">
                    <i className="fas fa-truck"></i>
                    </Link>

                    <Link aria-label = "Clients" to = "/clients">
                    <i className="fas fa-users"></i>
                    </Link>
                    </>
                }

                {selectedRouteId &&
                    <>
                        <a aria-label="Close Route" onClick={() => {
                            clearRouteId()
                            props.history.push("/routes")
                        }}>
                            <i className="fas fa-window-close"></i>
                        </a>

                        <Link aria-label="Orders" to="/route/orders" >
                            <i className="fas fa-box"/>
                        </Link>

                        <Link aria-label="Solutions" to="/route/solutions" >
                            <i className="fas fa-map"/>
                        </Link>
                    </>
                }
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
