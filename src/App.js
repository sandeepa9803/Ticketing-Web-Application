import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//importing components from the components folder
import Add from "./components/AddRoutes";
import All from "./components/AllRoutes";
import Edit from "./components/EditRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          {/* Add routes to the navigation bar */}
          <Switch>
            <Route
              path="/add"
              component={Add} 
            />
            <Route
              path="/all"
              exact={true}
              component={All} 
            />
            <Route
              path="/edit/:id"
              component={Edit} 
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
