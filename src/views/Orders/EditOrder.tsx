import { LinearProgress } from '@material-ui/core';
import React, { useContext } from 'react'
import { DeliveryOrderInputForm } from '../../generated/globalTypes';
import { AlertContext } from '../../state/Alert';
import { DeliveryRouteContext } from '../../state/RouteContext';
import usePersistentState from '../../utils/usePersistentState';

export interface Props {
    [key: string]: any
}

const EditOrder = (props: Props) => {
    const type = props.match.params.type === "advanced" ? "Advanced" : "Basic";
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    // const [form, setForm, forceSetForm] = usePersistentState <DeliveryOrderInputForm> (`edit-order-${type}`, defaultData);
    const {setAlert} = useContext(AlertContext);
    

    // const updateForm = (key: string) => (e: any) => {
    //     if (key === "weight" || key === "volume") {
    //         setForm({
    //             ...form,
    //             [key]: parseFloat(e.target.value)
    //         })
    //     } else {
    //         setForm({
    //             ...form,
    //             [key]: e.target.value
    //         })
    //     }
    // }
    const handleClick = async () => {
        // if (empty(form.name) || empty(form.address)) {
        //     setAlert({type: "error", message: "Some required fields are empty."})
        //     return;
        // }

        // form.routeId = selectedRouteId
        // await addOrder({
        //     variables: {
        //         order: form
        //     }
        // })

        // setAlert({type: "success", message: "Order added successfully."})
        // props.history.push("/route/orders");
    }

    return (
        <div className="add-driver">
            {/* <div className="title">
                Add Order
            </div>
            <div className = "form">
                <div className = "input-box">
                    <p>Name:   * </p>
                    <input value = {form.name} placeholder = "Food delivery" onChange = {updateForm("name")}/>
                </div>
                <div className = "input-box">
                    <p>Address:   * </p>
                    <input value = {form.address} placeholder = "Bucharest Romania" onChange = {updateForm("address")}/>
                </div>

                {type == 'Advanced' &&
                <>
                    <div className = "input-box">
                        <p>Volume: </p>
                        <input value = {form.volume || ""} placeholder = "100 m3" onChange = {updateForm("volume")}/>
                    </div>
                    <div className = "input-box">
                        <p>Weight: </p>
                        <input value = {form.weight || ""} placeholder = "5000 kg" onChange = {updateForm("weight")}/>
                    </div>
                    <div className = "input-box dual">
                        <div>
                            <p>Time window start: </p>
                            <input type = "time" value = {form.startTime || ""} onChange = {updateForm("startTime")}/>
                        </div>
                        <div>
                            <p>Time window end: </p>
                            <input type = "time" value = {form.endTime || ""} onChange = {updateForm("endTime")}/>
                        </div>
                    </div>
                </>
                }


                <button className = "btn" onClick = {handleClick}>
                    Add Order
                </button>
            </div> */}
        </div>
    )
}

 export default EditOrder;