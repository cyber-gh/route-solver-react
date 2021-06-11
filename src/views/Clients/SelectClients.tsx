import { useQuery } from '@apollo/client';
import React, { Fragment, useContext, useEffect } from 'react'
import { CLIENTS_QUERY } from '../../api/Queries';
import { AlertContext } from '../../state/Alert';
import usePersistentState from '../../utils/usePersistentState';
import CustomCheckbox from './CustomCheckbox';

export interface Props {
    [key: string]: any
}

const SelectClients = (props: Props) => {
    const {loading, error, data} = useQuery(CLIENTS_QUERY)
    const [checked, setChecked] = usePersistentState <{[key:string]: boolean | undefined}> ("selected-drivers", {});
    const {setAlert} = useContext(AlertContext);

    useEffect(props.open, []);

    useEffect(() => {
        if (error) {
            setAlert({type: "error", message: "Error fetching drivers " + error.message})
        }
    }, [error])

    let clients = []
    if (data) {
        clients = data.clients
    }

    const handleClick = (x: string) => () => {
        setChecked({
            ...checked,
            [x]: !checked[x]
        })
    }

    return (
        <div className = "home">
            <div className="title">
                Select Clients
            </div>
            <div className = "drivers sel">
                    <p className = "label">
                        {""}
                    </p>
                    <p className="label">
                        CLIENT NAME
                    </p>
                    <p className="label">
                        EMAIL
                    </p>
                    <p className="label">
                        ADDRESS
                    </p>

                    {clients.map((x: any) => (
                        <Fragment key = {x.id}>
                            <CustomCheckbox onChange = {handleClick(x.id)} value = {!!checked[x.id]}/>
                            <p className = "data">
                                {x.name}
                            </p>
                            <p className = "data">
                                {x.email}
                            </p>
                            <p className = "data oneline">
                                {x.location.address}
                            </p>
                        </Fragment>
                    ))}
                </div>
            {clients.length > 0 && <button className = "btn" style = {{margin: "30px auto 0 10px"}}>Done</button>}
        </div>
    );
}

 export default SelectClients;