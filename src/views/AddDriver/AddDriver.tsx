import React from 'react'
import usePersistentState from '../../utils/usePersistentState';
import "./AddDriver.scss";
import { DriverForm } from '../../utils/types';

export interface Props {
    [key: string]: any
}

const defaultData: DriverForm = {
    name: "",
    email: "",
    location: "",
    weight: "",
    volume: "",
    schedule: "",
}

const AddDriver = (props: Props) => {
    const type = props.match.params.type === "advanced" ? "Advanced" : "Basic";
    const [form, setForm] = usePersistentState <DriverForm> ("add-driver", defaultData);

    const updateForm = (key: string) => (e: any) => {
        setForm({
            ...form,
            [key]: e.target.value
        })
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Drivers ({type})
            </div>
            <div className = "form">
                <div className = "input-box">
                    <p>Name: </p>
                    <input value = {form.name} placeholder = "John Smith" onChange = {updateForm("name")}/>
                </div>
                <div className = "input-box">
                    <p>E-Mail: </p>
                    <input value = {form.email} placeholder = "johnsmith@mail.com" onChange = {updateForm("email")}/>
                </div>
                <div className = "input-box">
                    <p>Location: </p>
                    <input value = {form.location} placeholder = "Bucharest, Romania" onChange = {updateForm("location")}/>
                </div>
                {type == 'Advanced' &&
                    <>
                        <div className = "input-box">
                            <p>Weight: (optional) </p>
                            <input value = {form.weight} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                        </div>
                        <div className = "input-box">
                            <p>Volume: (optional) </p>
                            <input value = {form.volume} placeholder = "5000 m^3" onChange = {updateForm("volume")}/>
                        </div>
                        <div className = "input-box">
                            <p>Schedule: (optional) </p>
                            <input value = {form.schedule} placeholder = "08:00 - 16:00" onChange = {updateForm("schedule")}/>
                        </div>
                    </>
                }
                <button className = "btn">
                    Add Driver
                </button>
            </div>
        </div>
    );
}

 export default AddDriver;