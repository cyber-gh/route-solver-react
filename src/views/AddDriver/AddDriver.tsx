import React, { useEffect } from 'react'
import usePersistentState from '../../utils/usePersistentState';
import "./AddDriver.scss";
import { Driver } from '../../utils/types';
import { useContext } from 'react';
import { AlertContext } from '../../state/Alert';
import { empty, getUniqueId } from '../../utils/aux';
import { DriverContext } from '../../state/DriverContext';
import {useMutation} from "@apollo/client";
import {ADD_DRIVER} from "../../api/Mutations";
import {DRIVERS_QUERY} from "../../api/Queries";
import {LinearProgress} from "@material-ui/core";

export interface Props {
    [key: string]: any
}

const defaultData: Driver = {
    name: "",
    email: "",
    location: {
        address: ""
    },
    weight: "",
    volume: "",
    schedule_begin: "",
    schedule_end: "",
    id: "",
}

const AddDriver = (props: Props) => {
    const type = props.match.params.type === "advanced" ? "Advanced" : "Basic";
    const [form, setForm, forceSetForm] = usePersistentState <Driver> ("add-driver", defaultData);
    const {setAlert} = useContext(AlertContext);
    const [addDriver, {loading}] = useMutation(ADD_DRIVER, {
        refetchQueries: [{
            query: DRIVERS_QUERY
        }]
    })

    useEffect(props.open, []);
    useEffect(() => {
        if (type === "Basic" && (form.weight || form.volume || form.schedule_begin || form.schedule_end)) {
            forceSetForm({
                ...form,
                location: {
                    address: ""
                },
                weight: "",
                volume: "",
                schedule_begin: "",
                schedule_end: "",
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

    const handleClick = () => {

        if (empty(form.email) || empty(form.location.address) || empty(form.name)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }

        let driver = {
            ...form,
            id: getUniqueId()
        }
        addDriver({
            variables: {
                name: driver.name,
                email: driver.email,
                address: driver.location.address
            }
        })
        setAlert({type: "success", message: "Driver added successfully."})
        props.history.push("/");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Drivers ({type})
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
                    <p>Location:   * </p>
                    <input value = {form.location.address} placeholder = "Bucharest, Romania" onChange = {updateLocation}/>
                </div>
                {type == 'Advanced' &&
                    <>
                        <div className = "input-box">
                            <p>Weight: </p>
                            <input value = {form.weight} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                        </div>
                        <div className = "input-box">
                            <p>Volume: </p>
                            <input value = {form.volume} placeholder = "5000 m^3" onChange = {updateForm("volume")}/>
                        </div>
                        <div className = "input-box dual">
                            <div>
                                <p>Schedule start: </p>
                                <input type = "time" value = {form.schedule_begin} onChange = {updateForm("schedule_begin")}/>
                            </div>
                            <div>
                                <p>Schedule end: </p>
                                <input type = "time" value = {form.schedule_end} onChange = {updateForm("schedule_end")}/>
                            </div>
                        </div>
                    </>
                }
                <button className = "btn" onClick = {handleClick}>
                    Add Driver
                </button>
            </div>
        </div>
    );
}

 export default AddDriver;
