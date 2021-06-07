import React, {Fragment, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {useMutation, useQuery} from "@apollo/client";
import {ROUTES_QUERY} from "../../api/Queries";
import {routes} from "../../api/__generated__/routes";
import {AlertContext} from "../../state/Alert";
import {DELETE_ROUTE} from "../../api/Mutations";
import {deleteRoute} from "../../api/__generated__/deleteRoute";
import {query} from "express";
import {DeliveryRouteContext} from "../../state/RouteContext";

interface Props {
    [key: string]: any
}


const RoutesView = (props: Props) => {
    const {setSelectedRoute} = useContext(DeliveryRouteContext);
    const {setAlert} = useContext(AlertContext);
    const {loading: driversLoading, error, data} = useQuery<routes>(ROUTES_QUERY)
    const [delRoute, {loading: deleteLoading}] = useMutation<deleteRoute>(DELETE_ROUTE, {
        refetchQueries: [{
            query: ROUTES_QUERY
        }],
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        }
    })

    useEffect(() => {
        if (error) {
            setAlert({type: "error", message: "Error fetching drivers " + error.message})
        }
    }, [error])

    const handleDelete = (id: string) => () => {
        delRoute({
            variables: {
                routeId: id
            }
        })
    }

    const handleEdit = (id: string) => () => {
        setSelectedRoute(id)
    }


    return (
        <div className = "home">
            <div className="title">
                Manage routes
            </div>
            <div className="actions">
                <Link to = "/add-route">
                    Add Route
                </Link>
            </div>
            {(driversLoading || deleteLoading) && <LinearProgress />}
            <div className = "drivers">
                <p className="label">
                    Name
                </p>
                <p className="label">
                    State
                </p>
                <p className="label">
                    Start time
                </p>
                <p className = "label">
                    {""}
                </p>
                <p className = "label">
                    {""}
                </p>
                {data &&  data.routes.map(x => (
                    <Fragment key = {x.id}>
                        <p className = "data">
                            {x.name}
                        </p>
                        <p className = "data">
                            {x.state}
                        </p>
                        <p className = "data oneline">
                            {x.startTime}
                        </p>
                        <div className = "data i-data" onClick={handleDelete(x.id)}>
                            <i className = "far fa-trash-alt"/>
                        </div>
                        <div className = "data i-data" onClick = {handleEdit(x.id)}>
                            <i className ="far fa-edit"/>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default RoutesView;
