import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import DriversView from "./views/Home/DriversView";
import LeftPanel from "./views/Menus/LeftPanel";
import Background from "./Background";
import AddDriver from "./views/AddDriver/AddDriver";
import placeholder from "./assets/map_placeholder.png";
import "./App.scss";
import usePersistentState from "./utils/usePersistentState";
import EditDriver from "./views/AddDriver/EditDriver";
import ClientsView from "./views/Clients/ClientsView";
import AddClient from "./views/Clients/AddClient";
import EditClient from "./views/Clients/EditClient";
import MainMapView from "./views/Map/MainMapView";
import RoutesView from "./views/Routes/RoutesView";
import AddRouteView from "./views/Routes/AddRouteView";

interface RouteData {
  [key: string]: any
  path: string, 
  component: any,
  condition?: boolean,
  redirectUrl?: string,
  props?: object
}

const CustomRoute = ({path, condition, redirectUrl, component: Component, ...other}: RouteData) => {
	if (!condition) {
		return <Redirect exact from = {path} to = {redirectUrl as string}/>
	}
	return (
		<Route exact path = {path} render = {(props: any) => <Component {...other} {...props}/>}/>
	)
}

const App = () => {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();
  const [mode, setMode] = usePersistentState("mode", "theme--dark");
  const [open, setOpen] = usePersistentState("left-panel", false);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>loading blea</div>
  }

  if (!isAuthenticated) {
    loginWithRedirect();

    return <div>Redirecting</div>
  }

  const toggleColorMode = () => {
    if (mode == "theme--dark") {
      setMode("theme--light");
    }
    else {
      setMode("theme--dark");
    }
  }

  return (
    <Router history={history}>
      <Background type = {mode}/>
      <LeftPanel toggleColorMode = {toggleColorMode} history={history} />
      <div className = "content">
        <div className = "menu">
          <div className = {`outer-panel ${open ? "open" : "closed"}`}>
            <div className = "control" onClick = {() => setOpen(!open)}>
              <i className ="fas fa-chevron-right"></i>
            </div>
            <div className="panel">
              <Switch>
                <CustomRoute open = {() => setOpen(true)} path = "/routes" condition = {true} component = {RoutesView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-route" condition = {true} component = {AddRouteView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/drivers" condition = {true} component = {DriversView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-driver/:type" condition = {true} component = {AddDriver}/>
                <CustomRoute open = {() => setOpen(true)} path = "/edit-driver/:id" condition = {true} component = {EditDriver}/>
                <CustomRoute open = {() => setOpen(true)} path = "/clients" condition = {true} component = {ClientsView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-client/:type" condition = {true} component = {AddClient}/>
                <CustomRoute open = {() => setOpen(true)} path = "/edit-client/:id" condition = {true} component = {EditClient}/>
                <Redirect from = "/logout" to = "/landing"/>
                <Redirect from = "*" to = "/drivers"/>
              </Switch>
            </div>
          </div>
          <div className="map">
              <MainMapView theme={mode}/>
          </div> 
        </div>
      </div>
    </Router>
  );
};

export default App;
