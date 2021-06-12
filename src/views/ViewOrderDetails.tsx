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
                <p> <pre className = "h">Name: </pre> {order!.name ? order!.name : "-"}</p>
                <p> <pre className = "h">Address: </pre> {order!.location.address ? order!.location.address : "-"}</p>
                <p> <pre className = "h">Weight: </pre> {order!.weight ? order!.weight : "-"}</p>
                <p> <pre className = "h">Volume: </pre> {order!.volume ? order!.volume : "-"}</p>
                <p> <pre className = "h">Start Time: </pre> {order!.startTime ? order!.startTime : "-"}</p>
                <p> <pre className = "h">End Time: </pre> {order!.endTime ? order!.endTime : "-"}</p>
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