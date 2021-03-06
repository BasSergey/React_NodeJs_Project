import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Users from "../pages/Users";
import Computers from "../pages/Computers"
import Devices from "../pages/Devices";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Loader from "react-loader-spinner";
import AuthContext from "../context";
import DesktopToDoList from "../pages/DesktopToDo/DesktopToDoList"
import Registration from "../pages/Registration";

const AppRoutes = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <Loader color="#ee6e73" timeout={3000} />;
  }

  return isAuth ? (
    <Switch>
      <Route path="/users" component={Users} />
      <Route path="/devices" component={Devices} />
      <Route path="/posts" component={Posts} />
      <Route path="/home" component={Home} />
      <Route path="/DesktopToDoList" component={DesktopToDoList}/>
      <Route path="/computers" component={Computers}/>
      
      <Redirect to="/users"></Redirect>
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRoutes;
