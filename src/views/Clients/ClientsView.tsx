import React, { Fragment, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AlertContext } from '../../state/Alert';
import { ClientContext } from '../../state/ClientContext';
import { DriverContext } from '../../state/DriverContext';
import "./Clients.scss";
import {useMutation, useQuery} from "@apollo/client";
import {CLIENTS_QUERY} from "../../api/Queries";
import {DELETE_CLIENT} from "../../api/Mutations";
import {LinearProgress} from "@material-ui/core";

export interface Props {
    [key: string]: any
}

const ClientsView = (props: Props) => {
    const {loading, error, data} = useQuery(CLIENTS_QUERY)
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        refetchQueries: [{
            query: CLIENTS_QUERY
        }]
    })
    const {setAlert} = useContext(AlertContext);

    useEffect(props.open, []);

    useEffect(() => {
        if (error) {
            setAlert({type: "error", message: "Error fetching drivers " + error.message})
        }
    }, [error])

    let clients = []
    if (data) {
        clients = data.clients
    }

    const handleClick = (x: string) => () => {
        deleteClient({
            variables: {
                id: x
            }
        }).then(t => {
            setAlert({type: "success", message: "Client removed successfully."})
        })
    }

    const handleEdit = (x: string) => () => {
        props.history.push("/edit-client/" + x);
    }
    
    return (
        <div className = "home">
            <div className="title">
                Manage Clients
            </div>
            <div className="actions">
                <Link to = "/add-client/basic">
                    Add Client (Basic)
                </Link>
                <Link to = "/add-client/advanced">
                    Add Client (Advanced)
                </Link>
            </div>
            {loading && <LinearProgress />}
            <div className = "drivers">
                <p className="label">
                    CLIENT NAME
                </p>
                <p className="label">
                    EMAIL
                </p>
                <p className="label">
                    ADDRESS
                </p>
                <p className = "label">
                    {""}
                </p>
                <p className = "label">
                    {""}
                </p>

                {clients.map((x: any) => (
                    <Fragment key = {x.id}>
                        <p className = "data">
                            {x.name}
                        </p>
                        <p className = "data">
                            {x.email}
                        </p>
                        <p className = "data oneline">
                            {x.location.address}
                        </p>
                        <div className = "data i-data" onClick = {handleClick(x.id)}>
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

 export default ClientsView;
