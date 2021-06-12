import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@material-ui/core';
import React from 'react'

export interface Props {
    [key: string]: any
    action?: () => void,
    question?: string,
    open: boolean,
    close?: () => void,
}

const ConfirmDialogue = ({question, action, open, close}: Props) => {

    const handleClose = () => {
        close!();
        action!();
    }

    if (!open) {
        return <></>
    }
    return (
        <Dialog
            open={true}
            onClose={close!}
            aria-labelledby="max-width-dialog-title"
        >
        <DialogTitle id="max-width-dialog-title">Confirm</DialogTitle>
        <DialogContent>
            <p style = {{margin: "0 0 10px 0", fontSize: "1.2em"}}>{question}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={close!} color="secondary" variant = "outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus variant = "contained">
            Confirm
          </Button>
        </DialogActions>
    </Dialog>
    );
}

 export default ConfirmDialogue;