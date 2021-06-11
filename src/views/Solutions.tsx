import React, {Fragment, useContext, useState} from "react";
import {LinearProgress} from "@material-ui/core";
import {DeliveryRouteContext} from "../state/RouteContext";
import {AlertContext} from "../state/Alert";
import {useMutation, useQuery} from "@apollo/client";
import {
    findRouteWithSolutions,
    findRouteWithSolutions_findRoute_solutions
} from "../generated/findRouteWithSolutions";
import {ROUTE_SOLUTIONS} from "../api/Queries";
import moment from "moment";
import {RouteMapContext} from "../state/MapContext";
import {deleteSolution} from "../generated/deleteSolution";
import {DELETE_SOLUTION, OPTIMIZER_ROUTE} from "../api/Mutations";
import {solveRoute} from "../generated/solveRoute";
import {VRPAlg} from "../generated/globalTypes";
import useQueryAlert from "../utils/useQueryAlert";
import ConfirmDialogue, {Props as ConfirmDialogueProps} from "./ConfirmDialogue";

interface Props {
    [key: string]: any
}

let formatTime = (seconds?: number): string => {
    if (seconds === undefined) return ""
    return moment.utc(seconds * 1000).format("HH[h] mm[m]")
}


const RouteSolutionsView = (props: Props) => {
    const {setSolution} = useContext(RouteMapContext);
    const [dialog, setDialog] = useState <ConfirmDialogueProps> ({open: false});
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const {setAlert} = useContext(AlertContext);

    const {loading: solutionLoading, data} = useQueryAlert<findRouteWithSolutions>(ROUTE_SOLUTIONS, {
        variables: {
            id: selectedRouteId
        },
    })

    const [deleteSolution, {loading: deleteLoading}] = useMutation<deleteSolution>(DELETE_SOLUTION, {
        refetchQueries: [{
            query: ROUTE_SOLUTIONS,
            variables: {
                id: selectedRouteId
            }
        }],
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        },
        onCompleted: () => {
            setAlert({type: "success", message: "Solution deleted"})
        }
    })

    const [optimize, {loading: optimizeLoading}] = useMutation<solveRoute>(OPTIMIZER_ROUTE, {
        refetchQueries: [{
            query: ROUTE_SOLUTIONS,
            variables: {
                id: selectedRouteId
            }
        }],
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        }
    })

    const handleViewSolution = (sol: findRouteWithSolutions_findRoute_solutions) => {
        setSolution(sol)
    }

    
    const handleOptimize = async (alg: VRPAlg) => {
        optimize({
            variables: {
                routeId: selectedRouteId,
                algorithm: alg
            }
        })
    }
    const closeDialog = () => {
        setDialog({
            open: false,
        })
    }
    
    const handleDelete = (idx: string) => async () => {
        setDialog({
            open: true,
            close: closeDialog,
            action: await delSolution(idx),
            question: "Are you sure you want to delete this solution?"
        })
    }
    const delSolution = (idx: string) => async () => {
        await deleteSolution({
            variables: {
                id: idx
            }
        })
    }
    
    return (
        <>
            <ConfirmDialogue {...dialog}/>
            <div className = "home">
                <div className="title">
                    Manage Solutions
                </div>
                <div className="actions">
                    <a onClick={() =>{handleOptimize(VRPAlg.backtrack)} }>
                        Backtrack
                    </a>
                    <a onClick={() =>{handleOptimize(VRPAlg.nearestNeighbour)} }>
                        Nearest Neighbour
                    </a>
                    <a onClick={() =>{handleOptimize(VRPAlg.greedySchrimp)} }>
                        Greedy Shrimp
                    </a>
                    {/*<a onClick={() =>{handleOptimize(VRPAlg.Christofides)} }>*/}
                    {/*    Christofides*/}
                    {/*</a>*/}
                </div>
                {(solutionLoading || deleteLoading || optimizeLoading) && <LinearProgress />}
                <div className = "drivers">
                    <p className="label">
                        Algorithm
                    </p>
                    <p className="label">
                        Distance
                    </p>
                    <p className="label">
                        Time
                    </p>
                    <p className = "label">
                        {""}
                    </p>
                    <p className = "label">
                        {""}
                    </p>


                    {data?.findRoute?.solutions.map(x => (
                        <Fragment key = {x.id}>
                            <p className = "data">
                                {x.algorithm}
                            </p>
                            <p className = "data">
                                {/*{((x.directions?.distance || x.distance) / 1000 ).toFixed(0)}km*/}
                                {((x.distance) / 1000 ).toFixed(0)}km
                            </p>
                            <p className = "data oneline">
                                {/*{formatTime((x.directions?.duration || 0))}s*/}
                                {formatTime((x.time || 0))}s
                            </p>
                            <div className = "data i-data" onClick={handleDelete(x.id)} >
                                <i className = "far fa-trash-alt"/>
                            </div>
                            <div className = "data i-data"  onClick={() => handleViewSolution(x)}>
                                <i className ="far fa-eye"/>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RouteSolutionsView;
