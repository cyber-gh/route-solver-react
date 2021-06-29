import React, {useEffect, useState} from "react";
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
import OrdersView from "./views/Orders/OrdersView";
import RouteSolutionsView from "./views/Solutions";
import AddOrderView from "./views/Orders/AddOrderView";
import Profile from "./views/Profile/Profile";
import SelectClients from "./views/Clients/SelectClients";
import loading from "./assets/loading.json"
import Lottie from 'react-lottie';
import DriverSelectView from "./views/AddDriver/DriverSelectView";

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

const defaultOptions = {
  loop: true,
  autoplay: true, 
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const App = () => {
  const { isAuthenticated, isLoading, error, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [mode, setMode] = usePersistentState("mode", "theme--dark");
  const [open, setOpen] = usePersistentState("left-panel", false);
  const [hasPermissions, setHasPermissions] = useState(false)

  const getPermission = async () => {
    let token = await getAccessTokenSilently();
    let ans = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ping`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    let json = await ans.json()
    // console.log("Permissions are")
    // console.log(json)

    if (json.permissions.length == 0) {
      console.log("Permissions are not set yet")
      console.log(json.permissions)
      await getAccessTokenSilently({
        ignoreCache: true
      })
      setHasPermissions(true)
    } else {
      setHasPermissions(true)
    }
  }

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getPermission()
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className = "pre-window">
        <Lottie options = {{
          ...defaultOptions,
          animationData: loading
        }} width = {400} height = {400}/>
      </div>
    )
  }

  if (!isAuthenticated || !hasPermissions) {
    if (!isAuthenticated) loginWithRedirect();

    return (
      <div className = "pre-window">
        <Lottie options = {{
          ...defaultOptions,
          animationData: loading
        }} width = {400} height = {400}/>
      </div>
    )
  }

  if (!hasPermissions) {
    return <div>Setting up your account, please wait</div>
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
      <LeftPanel toggleColorMode = {toggleColorMode} history = {history}/>
      <div className = "content">
        <div className = "menu">
          <div className = {`outer-panel ${open ? "open" : "closed"}`}>
            <div className = "control" onClick = {() => setOpen(!open)}>
              <i className ="fas fa-chevron-right"></i>
            </div>
            <div className="panel">
              <Switch>
                <CustomRoute open = {() => setOpen(true)} path = "/routes" condition = {true} component = {RoutesView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/route/assign-driver" condition = {true} component = {DriverSelectView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/route/add-order/:type" condition = {true} component = {AddOrderView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/route/orders" condition = {true} component = {OrdersView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/route/solutions" condition = {true} component = {RouteSolutionsView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-route" condition = {true} component = {AddRouteView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/drivers" condition = {true} component = {DriversView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-driver/:type" condition = {true} component = {AddDriver}/>
                <CustomRoute open = {() => setOpen(true)} path = "/edit-driver/:id" condition = {true} component = {EditDriver}/>
                <CustomRoute open = {() => setOpen(true)} path = "/clients" condition = {true} component = {ClientsView}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-client/:type" condition = {true} component = {AddClient}/>
                <CustomRoute open = {() => setOpen(true)} path = "/edit-client/:id" condition = {true} component = {EditClient}/>
                <CustomRoute open = {() => setOpen(true)} path = "/route/select-clients" condition = {true} component = {SelectClients}/>
                <CustomRoute close = {() => setOpen(false)} path = "/profile" condition = {true} component = {Profile}/>
                <Redirect from = "/logout" to = "/landing"/>
                <Redirect from = "*" to = "/routes"/>
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
