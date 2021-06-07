import React, {useContext} from "react";
import {LinearProgress} from "@material-ui/core";
import usePersistentState from "../../utils/usePersistentState";
import {Client} from "../../utils/types";
import {AlertContext} from "../../state/Alert";
import {addRoute, addRouteVariables} from "../../api/__generated__/addRoute";
import {useMutation} from "@apollo/client";
import {ADD_ROUTE} from "../../api/Mutations";
import {ROUTES_QUERY} from "../../api/Queries";
import {empty} from "../../utils/aux";
import {Props} from "../Clients/AddClient";


const defaultData: addRouteVariables = {
    name: "",
    startAddress: "",
    roundTrip: true
}

const AddRouteView = (props: Props) => {
    const [form, setForm, forceSetForm] = usePersistentState <addRouteVariables> ("add-route", defaultData);
    const {setAlert} = useContext(AlertContext);
    const [addRoute, {loading}] = useMutation(ADD_ROUTE, {
        refetchQueries: [{
            query: ROUTES_QUERY
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
        if (empty(form.name) || empty(form.startAddress)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }

        await addRoute({
            variables: form
        })

        setAlert({type: "success", message: "Route added successfully."})
        props.history.push("/routes");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Route
            </div>

            {loading && <LinearProgress />}
            <div className = "form">
                <div className = "input-box">
                    <p>Name:   * </p>
                    <input value = {form.name} placeholder = "Food delivery" onChange = {updateForm("name")}/>
                </div>
                <div className = "input-box">
                    <p>Start Address:   * </p>
                    <input value = {form.startAddress} placeholder = "Bucharest Romania" onChange = {updateForm("startAddress")}/>
                </div>

                <button className = "btn" onClick = {handleClick}>
                    Add Route
                </button>
            </div>
        </div>)
}


export default AddRouteView;
