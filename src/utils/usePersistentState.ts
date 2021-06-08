import { useCallback, useEffect, useState } from "react";
import {throttle} from "underscore";

const usePersistentState = <T extends unknown> (key: string, initialValue: T): [T, (x: T) => void, (x: T) => void] => {
    const [state, setState] = useState <T> (initialValue);

    useEffect(() => {
        let rawData = localStorage.getItem(key);
        let data;
        if (rawData) {
            data = JSON.parse(rawData);
            setState(data);
        }
    }, [])

    const setPersistance = useCallback(
        throttle((newData: T) => {
            if (newData !== undefined) {
                localStorage.setItem(key, JSON.stringify(newData))
            }
        }, 1500),
        []
    );

    const setData = (newData: T) => {
        setState(newData);
        setPersistance(newData);
    }

    const setInstantData = (newData: T) => {
        localStorage.setItem(key, JSON.stringify(newData));
        setState(newData);
    }

    return [state, setData, setInstantData];
}

export default usePersistentState;
