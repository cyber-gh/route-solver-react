import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react'
import { addOrder } from '../generated/addOrder';
import { findRoute_findRoute_orders } from '../generated/findRoute';
import "./ViewDetails.scss"

export interface Props {
    [key: string]: any,
    order?: findRoute_findRoute_orders,
    close?: () => void,
    open: boolean,
}

const ViewOrderDetails = ({order, open, close}: Props) => {

    if (!open) {
        return <></>
    }

    return (
        <Dialog
            open={true}
            onClose={close!}
            aria-labelledby="max-width-dialog-title"
            fullWidth
            maxWidth = "xs"
        >
            <DialogTitle id="max-width-dialog-title">Order Details</DialogTitle>
            <DialogContent>
            <div className = "view-main">
                <div>
                    <pre className = "h">Name: </pre>
                    <pre className = "h">Weight: </pre>
                    <pre className = "h">Start Time: </pre>
                    <pre className = "h">Volume: </pre>
                    <pre className = "h">End Time: </pre>
                    <pre className = "h">Address: </pre>
                </div>
                <div>
                    <p> {order!.name ? order!.name : "-"}</p>
                    <p> {order!.weight ? order!.weight + " kg" : "-"}</p>
                    <p> {order!.volume ? order!.volume + " m3": "-"}</p>
                    <p> {order!.startTime ? order!.startTime : "-"}</p>
                    <p> {order!.endTime ? order!.endTime : "-"}</p>
                    <p> {order!.location.address ? order!.location.address : "-"}</p>
                </div>
            </div>
            </DialogContent>
            <DialogActions>
                <Button variant = "contained" color = "primary" onClick = {close}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ViewOrderDetails;
