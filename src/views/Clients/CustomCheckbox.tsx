import React from 'react'
import "./CustomCheckbox.scss";

export interface Props {
    [key: string]: any
    onChange: () => void,
    value: boolean,
}

const CustomCheckbox = ({onChange, value}: Props) => {

    return (
        <div className = {"custom-check-box " + (value ? "checked" : "")} onClick = {onChange}>
            {value ? <i className="fas fa-check"></i> : <></>}
        </div>
    );
}

 export default CustomCheckbox;