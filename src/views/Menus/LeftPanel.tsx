import React, {useContext} from 'react'
import "./LeftPanel.scss";
import Logo from "../../assets/logo.png"
import { Link, useHistory, useLocation } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import {DeliveryRouteContext} from "../../state/RouteContext";

export interface Props {
    [key: string]: any,
    toggleColorMode: () => void
}

const LeftPanel = (props: Props) => {
    let {pathname} = useLocation();
    const {toggleColorMode, history} = props
    const { logout } = useAuth0();
    const {selectedRouteId, clearRouteId} = useContext(DeliveryRouteContext);

    return (
        <div className = "left-panel">
            <div>
                <Link to = '/' className = {"first"}>
                    <i className = "fas fa-car"></i>
                </Link>

                {!selectedRouteId &&
                    <>
                        <Link className = {pathname.includes("/routes") ? "active" : ""} to="/routes">
                            <i className="fas fa-route"></i>
                            <p>Routes</p>
                        </Link>

                        <Link className = {pathname.includes("/drivers") || pathname.includes("/edit-driver") ? "active" : ""} to = "/drivers">
                            <i className="fas fa-truck"></i>
                            <p>Drivers</p>
                        </Link>

                        <Link className = {pathname.includes("/clients") || pathname.includes("/edit-client") ? "active" : ""} to = "/clients">
                            <i className="fas fa-users"></i>
                            <p>Clients</p>
                        </Link>
                    </>
                }

                {selectedRouteId &&
                    <>
                        <a onClick={() => {
                            clearRouteId()
                            history.push("/routes")
                        }}>
                            <i className="fas fa-window-close"></i>
                            <p>Close Route</p>
                        </a>

                        <Link className = {pathname.includes("/orders") ? "active" : ""} to="/route/orders" >
                            <i className="fas fa-box"/>
                            <p>Orders</p>
                        </Link>

                        <Link className = {pathname.includes("/solutions")? "active" : ""} to="/route/solutions" >
                            <i className="fas fa-map"/>
                            <p>Solutions</p>
                        </Link>
                    </>
                }
            </div>
            <div>
                <a onClick = {toggleColorMode} className = "click">
                    <i className ="far fa-lightbulb"></i>
                </a>
                <a onClick={() =>{
                    logout({returnTo: process.env.REACT_APP_LANDING_PAGE_URL})
                } }>
                    <i className ="fas fa-sign-out-alt"></i>
                    <p>Log Out</p>
                </a>
                <Link to = "/profile">
                    <i className="fas fa-id-badge"></i>
                    <p>Profile</p>
                </Link>
            </div>
        </div>
    );
}

 export default LeftPanel;
