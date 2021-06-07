import React, { useContext, useEffect } from 'react'
import { AlertContext } from '../../state/Alert';
import { ClientContext } from '../../state/ClientContext';
import { DriverContext } from '../../state/DriverContext';
import { empty, getUniqueId } from '../../utils/aux';
import { Client, Driver } from '../../utils/types';
import usePersistentState from '../../utils/usePersistentState';
import {gql, useMutation} from "@apollo/client";
import {ADD_CLIENT} from "../../api/Mutations";
import {CLIENTS_QUERY} from "../../api/Queries";
import {LinearProgress} from "@material-ui/core";

export interface Props {
    [key: string]: any
}


const defaultData: Client = {
    name: "",
    email: "",
    location: {
        address: ""
    },
    weight: undefined,
    id: "",
    startTime: "",
    endTime: ""
}

const AddClient = (props: Props) => {
    const type = props.match.params.type === "advanced" ? "Advanced" : "Basic";
    const [form, setForm, forceSetForm] = usePersistentState <Client> ("add-client", defaultData);
    const {setAlert} = useContext(AlertContext);
    const [addClient, {loading}] = useMutation(ADD_CLIENT, {
        refetchQueries: [{
            query: CLIENTS_QUERY
        }]
    });

    useEffect(props.open, []);

    useEffect(() => {
        if (type === "Basic" && (form.weight || form.startTime || form.endTime)) {
            forceSetForm({
                ...form,
                location: {
                    address: ""
                },
                weight: undefined,
                startTime: "",
                endTime: ""
            })
        }
    }, [form])

    const updateForm = (key: string) => (e: any) => {
        setForm({
            ...form,
            [key]: e.target.value
        })
    }

    const updateLocation = (e: any) => {
        let newForm = {...form}
        newForm.location.address = e.target.value
        setForm(newForm)
    }


    const handleClick = async () => {
        // if (!form.startTime) {
        //     form.startTime = "08:00";
        // }
        // if (!form.endTime) {
        //     form.endTime = "16:00";
        // }
        if (empty(form.email) || empty(form.location.address) || empty(form.name)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }
        else if (form.startTime && form.endTime && form.startTime >= form.endTime) {
            setAlert({type: "error", message: "Time interval is invalid."})
            return;
        }
        let client = {
            ...form,
            id: getUniqueId()
        }
        await addClient({
            variables: {
                client: {
                    name: client.name,
                    email: client.email,
                    address: client.location.address,
                    startTime: client.startTime || null,
                    endTime: client.endTime || null,
                    weight: client.weight || null,
                    volume: client.volume || null
                }
            }
        })
        setAlert({type: "success", message: "Client added successfully."})
        props.history.push("/clients");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Clients ({type})
            </div>

            {loading && <LinearProgress />}
            <div className = "form">
                <div className = "input-box">
                    <p>Name:   * </p>
                    <input value = {form.name} placeholder = "John Smith" onChange = {updateForm("name")}/>
                </div>
                <div className = "input-box">
                    <p>E-Mail:   * </p>
                    <input value = {form.email} placeholder = "johnsmith@mail.com" onChange = {updateForm("email")}/>
                </div>
                <div className = "input-box">
                    <p>Address:   * </p>
                    <input value = {form.location.address} placeholder = "Bucharest, Romania" onChange = {updateLocation}/>
                </div>
                {type == 'Advanced' &&
                    <>
                        <div className = "input-box">
                            <p>Weight: </p>
                            <input value = {form.weight} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                        </div>
                        <div className = "input-box dual">
                            <div>
                                <p>Time window start: </p>
                                <input type = "time" value = {form.startTime} onChange = {updateForm("startTime")}/>
                            </div>
                            <div>
                                <p>Time window end: </p>
                                <input type = "time" value = {form.endTime} onChange = {updateForm("endTime")}/>
                            </div>
                        </div>
                    </>
                }
                <button className = "btn" onClick = {handleClick}>
                    Add Client
                </button>
            </div>
        </div>
    );
}
    

export default AddClient;
