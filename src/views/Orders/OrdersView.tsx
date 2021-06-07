import React, {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {DeliveryRouteContext} from "../../state/RouteContext";
import {AlertContext} from "../../state/Alert";
import {useQuery} from "@apollo/client";
import {routesWithOrders} from "../../api/__generated__/routesWithOrders";
import {ROUTE_WITH_ORDERS, ROUTES_AND_ORDERS_QUERY} from "../../api/Queries";
import {findRoute} from "../../api/__generated__/findRoute";
import moment from "moment";
import {RouteMapContext} from "../../state/MapContext";

interface Props {
    [key: string]: any
}


const OrdersView = (props: Props) => {
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const {setCurrentRoute} = useContext(RouteMapContext);
    const {setAlert} = useContext(AlertContext);
    const {loading: ordersLoading, data} = useQuery<findRoute>(ROUTE_WITH_ORDERS, {
        variables: {
            id: selectedRouteId
        },
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        },
        onCompleted: (x) => {
            console.log("Setting current route")
            setCurrentRoute(x)
        }
    })


    return (
        <div className = "home">
            <div className="title">
                Manage Route Orders
            </div>
            <div className="actions">
                <Link to = "/add-order/basic">
                    Add Order (Basic)
                </Link>
                <Link to = "/add-order/advanced">
                    Add Order (Advanced)
                </Link>
            </div>
            {ordersLoading && <LinearProgress />}
            <div className = "drivers">
                <p className="label">
                    Name
                </p>
                <p className="label">
                    Address
                </p>
                <p className="label">
                    Time Interval
                </p>
                <p className = "label">
                    {""}
                </p>
                <p className = "label">
                    {""}
                </p>

                {data?.findRoute &&
                    <Fragment key={data.findRoute.id}>
                    <p className="data">
                        Start Location
                    </p>
                    <p className="data">
                        {data.findRoute.startLocation.address}
                    </p>
                    <p className="data oneline">
                        { "-"} - {"-"}
                    </p>
                    <div className="data i-data">

                    </div>
                    <div className="data i-data">
                    </div>
                </Fragment>
                }
                {data?.findRoute?.orders.map(x => (
                    <Fragment key = {x.id}>
                        <p className = "data">
                            {x.name}
                        </p>
                        <p className = "data">
                            {x.location.address}
                        </p>
                        <p className = "data oneline">
                            {x.startTime || "-"} - {x.endTime || "-"}
                        </p>
                        <div className = "data i-data" >
                            <i className = "far fa-trash-alt"/>
                        </div>
                        <div className = "data i-data" >
                            <i className ="far fa-edit"/>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default OrdersView;
