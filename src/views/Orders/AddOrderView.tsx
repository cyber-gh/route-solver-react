import React, {useContext} from "react";
import usePersistentState from "../../utils/usePersistentState";
import {addRouteVariables} from "../../generated/addRoute";
import {AlertContext} from "../../state/Alert";
import {useMutation} from "@apollo/client";
import {ADD_ORDER, ADD_ROUTE} from "../../api/Mutations";
import {ROUTE_SOLUTIONS, ROUTE_WITH_ORDERS, ROUTES_QUERY} from "../../api/Queries";
import {empty} from "../../utils/aux";
import {LinearProgress} from "@material-ui/core";
import {addOrderVariables} from "../../generated/addOrder";
import {DeliveryRouteContext} from "../../state/RouteContext";

const defaultData: addOrderVariables = {
    routeId: "",
    name: "",
    address: ""
}

interface Props {
    [key: string]: any
}

const AddOrderView = (props: Props) => {
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const [form, setForm, forceSetForm] = usePersistentState <addOrderVariables> ("add-order", defaultData);
    const {setAlert} = useContext(AlertContext);
    const [addOrder, {loading}] = useMutation(ADD_ORDER, {
        refetchQueries: [{
            query: ROUTE_WITH_ORDERS,
            variables: {
                id: selectedRouteId
            }
        }],
        onError: (error) => {
            setAlert({type: "error", message: error.message})
        }
    })

    const updateForm = (key: string) => (e: any) => {
        setForm({
            ...form,
            [key]: e.target.value
        })
    }
    const handleClick = async () => {
        if (empty(form.name) || empty(form.address)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }

        form.routeId = selectedRouteId
        await addOrder({
            variables: form
        })

        setAlert({type: "success", message: "Order added successfully."})
        props.history.push("/route/orders");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Order
            </div>

            {loading && <LinearProgress />}
            <div className = "form">
                <div className = "input-box">
                    <p>Name:   * </p>
                    <input value = {form.name} placeholder = "Food delivery" onChange = {updateForm("name")}/>
                </div>
                <div className = "input-box">
                    <p>Address:   * </p>
                    <input value = {form.address} placeholder = "Bucharest Romania" onChange = {updateForm("address")}/>
                </div>

                <button className = "btn" onClick = {handleClick}>
                    Add Order
                </button>
            </div>
        </div>)
}

export default AddOrderView;
