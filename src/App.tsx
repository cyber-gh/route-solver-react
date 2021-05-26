import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import Home from "./views/Home/Home";
import LeftPanel from "./views/Menus/LeftPanel";
import Background from "./Background";
import AddDriver from "./views/AddDriver/AddDriver";
import placeholder from "./assets/map_placeholder.png";
import "./App.scss";
import usePersistentState from "./utils/usePersistentState";
import EditDriver from "./views/AddDriver/EditDriver";

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
  const { isLoading, error } = useAuth0();
  const [open, setOpen] = usePersistentState("left-panel", false);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>loading blea</div>
  }

  return (
    <Router history={history}>
      <Background/>
      <LeftPanel/>
      <div className = "content">
        <div className = "menu">
          <div className = {`outer-panel ${open ? "open" : "closed"}`}>
            <div className = "control" onClick = {() => setOpen(!open)}>
              <i className ="fas fa-chevron-right"></i>
            </div>
            <div className="panel">
              <Switch>
                <CustomRoute open = {() => setOpen(true)} path = "/home" condition = {true} component = {Home}/>
                <CustomRoute open = {() => setOpen(true)} path = "/add-driver/:type" condition = {true} component = {AddDriver}/>
                <CustomRoute open = {() => setOpen(true)} path = "/edit-driver/:id" condition = {true} component = {EditDriver}/>
                <Redirect from = "*" to = "/home"/>
              </Switch>
            </div>
          </div>
          <div className="map">
              <img src = {placeholder}/>
          </div> 
        </div>
      </div>
    </Router>
  );
};

export default App;
