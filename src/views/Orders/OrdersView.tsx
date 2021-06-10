import React, {Fragment, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {DeliveryRouteContext} from "../../state/RouteContext";
import {AlertContext} from "../../state/Alert";
import {useMutation, useQuery} from "@apollo/client";
import {ROUTE_WITH_ORDERS, ROUTES_AND_ORDERS_QUERY} from "../../api/Queries";
import {findRoute} from "../../generated/findRoute";
import moment from "moment";
import {RouteMapContext} from "../../state/MapContext";
import {deleteOrder} from "../../generated/deleteOrder";
import {DELETE_ORDER} from "../../api/Mutations";
import ConfirmDialogue, {Props as ConfirmDialogueProps} from "../ConfirmDialogue";

interface Props {
    [key: string]: any
}


const OrdersView = (props: Props) => {
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const [dialog, setDialog] = useState <ConfirmDialogueProps> ({open: false});
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

    const [deleteOrder, {loading: deleteLoading}] = useMutation<deleteOrder>(DELETE_ORDER, {
        refetchQueries: [{
            query: ROUTE_WITH_ORDERS,
            variables: {
                id: selectedRouteId
            }
        }],
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        },
        onCompleted: () => {
            setAlert({type: "success", message: "Order deleted"})
        }
    })
    const closeDialog = () => {
        setDialog({
            open: false,
        })
    }

    const handleDelete = (idx: string) => async () => {
        setDialog({
            open: true,
            close: closeDialog,
            action: await delOrder(idx),
            question: "Are you sure you want to delete this client?"
        })
    }

    const delOrder = (idx: string) => async () => {
        await deleteOrder({
            variables: {
                orderId: idx
            }
        })
    }
    
    
    return (
        <>
            <ConfirmDialogue {...dialog}/>
            <div className = "home">
                <div className="title">
                    Manage Route Orders
                </div>
                <div className="actions">
                    <Link to = "/route/add-order/basic">
                        Add Order (Basic)
                    </Link>
                    <Link to = "/route/add-order/advanced">
                        Add Order (Advanced)
                    </Link>
                </div>
                {(ordersLoading || deleteLoading) && <LinearProgress />}
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
                            <div className = "data i-data" onClick={handleDelete(x.id)}>
                                <i className = "far fa-trash-alt"/>
                            </div>
                            <div className = "data i-data" >
                                {/*<i className ="far fa-edit"/>*/}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}

export default OrdersView;
