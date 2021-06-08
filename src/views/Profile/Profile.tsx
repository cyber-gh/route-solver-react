import { useAuth0 } from '@auth0/auth0-react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { getTokenSilently } from '../../utils/AuthUtility';
import usePersistentState from '../../utils/usePersistentState';
import "./Profile.scss"

export interface Props {
    [key: string]: any
    close: () => void
}

const Profile = (props: Props) => {
    props.close();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [token, setToken] = usePersistentState("profile-token", undefined);

    useEffect(() => {
        getTokenSilently().then(x => setToken(x));
    }, [])
    console.log(user);

    const handleClose = () => {
        props.history.push("/");
    }


    return (
        <Dialog
            fullWidth
            maxWidth = "md"
            open={true}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
        <DialogTitle id="max-width-dialog-title">Profile</DialogTitle>
        <DialogContent>
            {!!user && !!token &&
                <div className="profile">
                    <i className = "fas fa-times" onClick = {handleClose}></i>
                    <div>
                        <p>Nickname: {user.nickname}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <img src = {user.picture!}/>
                </div>
            }
        </DialogContent>
      </Dialog>
    );
}

 export default Profile;