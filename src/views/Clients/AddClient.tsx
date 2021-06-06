import React, { useContext, useEffect } from 'react'
import { AlertContext } from '../../state/Alert';
import { ClientContext } from '../../state/ClientContext';
import { DriverContext } from '../../state/DriverContext';
import { empty, getUniqueId } from '../../utils/aux';
import { Client, Driver } from '../../utils/types';
import usePersistentState from '../../utils/usePersistentState';

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

const AddClient = (props: Props) => {
    const type = props.match.params.type === "advanced" ? "Advanced" : "Basic";
    const [form, setForm, forceSetForm] = usePersistentState <Client> ("add-client", defaultData);
    const {setAlert} = useContext(AlertContext);
    const {addClient} = useContext(ClientContext);

    useEffect(props.open, []);

    useEffect(() => {
        if (type === "Basic" && (form.weight || form.time_begin || form.time_end)) {
            forceSetForm({
                ...form,
                weight: "",
                time_begin: "",
                time_end: ""
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
        let client = {
            ...form,
            id: getUniqueId()
        }
        addClient(client);
        setAlert({type: "success", message: "Client added successfully."})
        props.history.push("/clients");
    }

    return (
        <div className="add-driver">
            <div className="title">
                Add Clients ({type})
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
                    <p>Address:   * </p>
                    <input value = {form.address} placeholder = "Bucharest, Romania" onChange = {updateForm("address")}/>
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
                                <input type = "time" value = {form.time_begin} onChange = {updateForm("time_begin")}/>
                            </div>
                            <div>
                                <p>Time window end: </p>
                                <input type = "time" value = {form.time_end} onChange = {updateForm("time_end")}/>
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