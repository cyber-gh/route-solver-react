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

interface RouteData {
  path: string, 
  component: any,
  condition?: boolean,
  redirectUrl?: string,
  props?: object
}

const CustomRoute = ({path, condition, redirectUrl, component: Component}: RouteData) => {
	if (!condition) {
		return <Redirect exact from = {path} to = {redirectUrl as string}/>
	}
	return (
		<Route exact path = {path} render = {(props: any) => <Component {...props}/>}/>
	)
}

const App = () => {
  const { isLoading, error } = useAuth0();

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
          <div className="panel">
            <Switch>
              <CustomRoute path = "/home" condition = {true} component = {Home}/>
              <CustomRoute path = "/add-driver/:type" condition = {true} component = {AddDriver}/>
              <Redirect from = "*" to = "/home"/>
            </Switch>
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
