import React, { useEffect } from 'react'
import usePersistentState from '../../utils/usePersistentState';
import "./AddDriver.scss";
import { Driver } from '../../utils/types';
import { useContext } from 'react';
import { AlertContext } from '../../state/Alert';
import { empty, getUniqueId } from '../../utils/aux';
import { DriverContext } from '../../state/DriverContext';

export interface Props {
    [key: string]: any
}

const defaultData: Driver = {
    name: "",
    email: "",
    location: "",
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
    const {addDriver} = useContext(DriverContext);

    useEffect(() => {
        if (type === "Basic" && (form.weight || form.volume || form.schedule_begin || form.schedule_end)) {
            forceSetForm({
                ...form,
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

    const handleClick = () => {
        if (!form.schedule_begin) {
            form.schedule_begin = "08:00";
        }
        if (!form.schedule_end) {
            form.schedule_end = "16:00";
        }
        if (empty(form.email) || empty(form.location) || empty(form.name)) {
            setAlert({type: "error", message: "Some required fields are empty."})
            return;
        }
        else if (form.schedule_begin >= form.schedule_end) {
            setAlert({type: "error", message: "Schedule interval is invalid."})
            return;
        }
        let driver = {
            ...form,
            id: getUniqueId()
        }
        addDriver(driver);
        setAlert({type: "success", message: "Driver added successfully."})
        props.history.push("/");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Drivers ({type})
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
                    <input value = {form.location} placeholder = "Bucharest, Romania" onChange = {updateForm("location")}/>
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