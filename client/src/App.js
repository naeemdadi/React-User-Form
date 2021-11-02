import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import UserForm from "./components/UserForm/UserForm";
import TotalUsers from "./components/Users/Users";
import UpdateUser from "./components/UpdateUser/UpdateUser";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/create" component={UserForm} />
        <Route path="/view" exact component={TotalUsers} />
        <Route path="/update/:id" component={UpdateUser} />
      </div>
    </Router>
  );
};

export default App;
