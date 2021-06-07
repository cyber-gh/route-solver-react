import React, {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {DeliveryRouteContext} from "../state/RouteContext";
import {AlertContext} from "../state/Alert";
import {useQuery} from "@apollo/client";
import {findRouteWithSolutions} from "../api/__generated__/findRouteWithSolutions";
import {ROUTE_SOLUTIONS} from "../api/Queries";
import moment from "moment";

interface Props {
    [key: string]: any
}

let formatTime = (seconds?: number): string => {
    if (seconds === undefined) return ""
    return moment.utc(seconds * 1000).format("HH[h] mm[m]")
}


const RouteSolutionsView = (props: Props) => {
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const {setAlert} = useContext(AlertContext);

    const {loading: solutionLoading, data} = useQuery<findRouteWithSolutions>(ROUTE_SOLUTIONS, {
        variables: {
            id: selectedRouteId
        },
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        }
    })

    return (
        <div className = "home">
            <div className="title">
                Manage Solutions
            </div>
            <div className="actions">
                <Link to = "/add-order/basic">
                    Backtrack solution
                </Link>
                <Link to = "/add-order/advanced">
                    Nearest Neighbour solution
                </Link>
            </div>
            {solutionLoading && <LinearProgress />}
            <div className = "drivers">
                <p className="label">
                    Algorithm
                </p>
                <p className="label">
                    Distance
                </p>
                <p className="label">
                    Time
                </p>
                <p className = "label">
                    {""}
                </p>
                <p className = "label">
                    {""}
                </p>


                {data?.findRoute?.solutions.map(x => (
                    <Fragment key = {x.id}>
                        <p className = "data">
                            {x.algorithm}
                        </p>
                        <p className = "data">
                            {(x.distance / 1000).toFixed(0)}km
                        </p>
                        <p className = "data oneline">
                            {formatTime((x.directions?.duration || 0))}s
                        </p>
                        <div className = "data i-data" >
                            <i className = "far fa-trash-alt"/>
                        </div>
                        <div className = "data i-data" >
                            <i className ="far fa-eye"/>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default RouteSolutionsView;
