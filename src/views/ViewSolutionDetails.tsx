import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react'
import { findRouteWithSolutions_findRoute_solutions } from '../generated/findRouteWithSolutions';
import "./ViewDetails.scss"

export interface Props {
    [key: string]: any,
    solution?: findRouteWithSolutions_findRoute_solutions,
    close?: () => void,
    open: boolean,
}

const ViewSolutionDetails = ({solution, open, close}: Props) => {

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
            <DialogTitle id="max-width-dialog-title">Solution Details</DialogTitle>
            <DialogContent>
            <div className = "view-main">
                <p> <pre className = "h">Algorithm: </pre> {solution!.algorithm ? solution!.algorithm : "-"}</p>
                <p> <pre className = "h">Number of orders: </pre> {solution!.nrOrders ? solution!.nrOrders : "-"}</p>
                <p> <pre className = "h">Distance: </pre> {solution!.distance ? solution!.distance : "-"}</p>
                <p> <pre className = "h">Time: </pre> {solution!.time ? solution!.time : "-"}</p>
                <p> <pre className = "h">Total Volume: </pre> {solution!.totalVolume ? solution!.totalVolume : "-"}</p>
                <p> <pre className = "h">Total Weight: </pre> {solution!.totalWeight ? solution!.totalWeight : "-"}</p>
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

export default ViewSolutionDetails;