import React, {Fragment, useContext} from "react";
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
import {VRPAlg} from "../globalTypes";

interface Props {
    [key: string]: any
}

let formatTime = (seconds?: number): string => {
    if (seconds === undefined) return ""
    return moment.utc(seconds * 1000).format("HH[h] mm[m]")
}


const RouteSolutionsView = (props: Props) => {
    const {setSolution} = useContext(RouteMapContext);
    const {selectedRouteId} = useContext(DeliveryRouteContext);
    const {setAlert} = useContext(AlertContext);

    const {loading: solutionLoading, data} = useQuery<findRouteWithSolutions>(ROUTE_SOLUTIONS, {
        variables: {
            id: selectedRouteId
        },
        onError: (err) => {
            setAlert({type: "error", message: err.message})
        }
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

    const handleDelete = async (idx: string) => {
        await deleteSolution({
            variables: {
                id: idx
            }
        })
        setAlert({type: "success", message: "Solution deleted"})
    }

    const handleOptimize = async (alg: VRPAlg) => {
        optimize({
            variables: {
                routeId: selectedRouteId,
                algorithm: alg
            }
        })
    }

    return (
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
                            {((x.directions?.distance || x.distance) / 1000 ).toFixed(0)}km
                        </p>
                        <p className = "data oneline">
                            {formatTime((x.directions?.duration || 0))}s
                        </p>
                        <div className = "data i-data" onClick={() => {handleDelete(x.id)} } >
                            <i className = "far fa-trash-alt"/>
                        </div>
                        <div className = "data i-data"  onClick={() => {handleViewSolution(x)} }>
                            <i className ="far fa-eye"/>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default RouteSolutionsView;
