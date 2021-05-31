import React, { useEffect, useState } from 'react'
import usePersistentState from '../../utils/usePersistentState';
import { Client, Driver } from '../../utils/types';
import { useContext } from 'react';
import { AlertContext } from '../../state/Alert';
import { empty, getUniqueId } from '../../utils/aux';
import { DriverContext } from '../../state/DriverContext';
import { ClientContext } from '../../state/ClientContext';

export interface Props {
    [key: string]: any
}

const defaultData: Client = {
    name: "",
    email: "",
    address: "",
    weight: "",
    id: "",
    time_begin: "",
    time_end: ""
}

const EditClient = (props: Props) => {
    const id = props.match.params.id;
    const [form, setForm] = useState <Client> (defaultData);
    const {setAlert} = useContext(AlertContext);
    const {clients, updateClient} = useContext(ClientContext);

    useEffect(props.open, []);

    useEffect(() => {
        let [client] = clients.filter(x => x.id === id);
        setForm(client);
    }, [])

    const updateForm = (key: string) => (e: any) => {
        setForm({
            ...form,
            [key]: e.target.value
        })
    }

    const handleClick = () => {
        if (!form.time_begin) {
            form.time_begin = "08:00";
        }
        if (!form.time_end) {
            form.time_end = "16:00";
        }
        if (empty(form.email) || empty(form.address) || empty(form.name)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }
        else if (form.time_begin >= form.time_end) {
            setAlert({type: "error", message: "Time interval is invalid."})
            return;
        }
        let driver = {
            ...form,
            id: getUniqueId()
        }
        updateClient(id, form);
        setAlert({type: "success", message: "Client edited successfully."})
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
                    <input value = {form.address} placeholder = "Bucharest, Romania" onChange = {updateForm("location")}/>
                </div>
                <div className = "input-box">
                    <p>Weight: </p>
                    <input value = {form.weight} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                </div>
                <div className = "input-box dual">
                    <div>
                        <p>Time frame start: </p>
                        <input type = "time" value = {form.time_begin} onChange = {updateForm("time_begin")}/>
                    </div>
                    <div>
                        <p>Time frame end: </p>
                        <input type = "time" value = {form.time_end} onChange = {updateForm("time_end")}/>
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