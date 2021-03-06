import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import React from 'react'
import { findRouteWithSolutions_findRoute_solutions } from '../generated/findRouteWithSolutions';
import "./ViewDetails.scss"
import moment from "moment";

export interface Props {
    [key: string]: any,
    solution?: findRouteWithSolutions_findRoute_solutions,
    close?: () => void,
    open: boolean,
}

let formatTime = (seconds?: number): string => {
    if (seconds === undefined) return ""
    return moment.utc(seconds * 1000).format("HH[h] mm[m]")
}


const ViewSolutionDetails = ({solution, open, close}: Props) => {

    if (!open) {
        return <></>
    }

    if (!solution) {
        return <>No solution selected</>
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
                    <div>
                        <pre className = "h">Algorithm: </pre>
                        <pre className = "h">Nr of orders: </pre>
                        <pre className = "h">Distance: </pre>
                        <pre className = "h">Time: </pre>
                        <pre className = "h">Total Volume: </pre>
                        <pre className = "h">Total Weight: </pre>
                    </div>
                    <div>
                        <p>{solution!.algorithm ? solution!.algorithm : "-"}</p>
                        <p>{solution!.nrOrders ? solution!.nrOrders : "-"}</p>
                        <p>{((solution.distance) / 1000 ).toFixed(0)}km</p>
                        <p>{formatTime((solution.time || 0))}</p>
                        <p>{solution!.totalVolume ? solution!.totalVolume : "-"}</p>
                        <p>{solution!.totalWeight ? solution!.totalWeight : "-"}</p>
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

export default ViewSolutionDetails;
