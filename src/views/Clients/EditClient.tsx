import React, { useEffect, useState } from 'react'
import usePersistentState from '../../utils/usePersistentState';
import { Client, Driver } from '../../utils/types';
import { useContext } from 'react';
import { AlertContext } from '../../state/Alert';
import { empty, getUniqueId } from '../../utils/aux';
import { DriverContext } from '../../state/DriverContext';
import { ClientContext } from '../../state/ClientContext';
import {client} from "../../api/ApiClient";
import {gql} from "@apollo/client";

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

const EditClient = (props: Props) => {
    const id = props.match.params.id;
    const [form, setForm] = useState <Client> (defaultData);
    const {setAlert} = useContext(AlertContext);

    useEffect(props.open, []);

    useEffect(() => {
        let dClient = client.readFragment({
            id: "DeliveryClient:" + id,
            fragment: gql`
                fragment MyClient on DeliveryClient {
                    id
                    name
                    email
                    location {
                        address
                        latitude
                        longitude
                    }
                }
            `
        })
        setForm(dClient);
    }, [])

    const updateForm = (key: string) => (e: any) => {
        setForm({
            ...form,
            [key]: e.target.value
        })
    }

    const updateLocation = (e: any) => {
        let newForm = {...form}
        newForm.location.address = e.target.value
    }

    const handleClick = () => {
        if (!form.startTime) {
            form.startTime = "08:00";
        }
        if (!form.endTime) {
            form.endTime = "16:00";
        }
        if (empty(form.email) || empty(form.location.address) || empty(form.name)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }
        else if (form.startTime >= form.endTime) {
            setAlert({type: "error", message: "Time interval is invalid."})
            return;
        }
        let driver = {
            ...form,
            id: getUniqueId()
        }
        // updateClient(id, form);
        setAlert({type: "warning", message: "Client edit not available at the moment"})
        props.history.push("/");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Edit Driver
            </div>
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
                    <p>Location:   * </p>
                    <input value = {form.location.address} placeholder = "Bucharest, Romania" onChange = {updateLocation}/>
                </div>
                <div className = "input-box">
                    <p>Weight: </p>
                    <input value = {form.weight} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                </div>
                <div className = "input-box dual">
                    <div>
                        <p>Time frame start: </p>
                        <input type = "time" value = {form.startTime} onChange = {updateForm("startTime")}/>
                    </div>
                    <div>
                        <p>Time frame end: </p>
                        <input type = "time" value = {form.endTime} onChange = {updateForm("endTime")}/>
                    </div>
                </div>
                <button className = "btn" onClick = {handleClick}>
                    Edit Client
                </button>
            </div>
        </div>
    );
}

export default EditClient;
