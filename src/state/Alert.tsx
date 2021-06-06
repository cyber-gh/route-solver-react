import React, {useState} from 'react'
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";

interface SnackbarMessage {
    message: string,
    type: "error" | "success" | "warning" | "info"
}

interface Props {
    setAlert: (x: SnackbarMessage) => void,
}

export const AlertContext = React.createContext<Props>({
    setAlert: () => null,
}); 

export const AlertProvider = ({ children, ...props } : {children: any}) => {
    const [data, setData] = useState<SnackbarMessage | null>(null);
    console.log(data);
    
    const closeSnackbar = () => {
        setData(null)
    }

    const setAlert = (x: SnackbarMessage) => {
        setData(x);
    }
    
    return (
        <AlertContext.Provider value={{setAlert}}>
            <>
                {data && 
                    <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open autoHideDuration={6000} onClose={closeSnackbar}>
                        <Alert onClose={closeSnackbar} severity={data.type}>
                            {data.message}
                        </Alert>
                    </Snackbar>
                }
                {children}
            </>
        </AlertContext.Provider>
    );
};