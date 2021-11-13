import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllCostumers from './components/AllCostumers';
import AddingUser from './components/AddingUser';
import MainScreen from './components/MainScreen';
import Transections from './components/Transections';


const App = ()=> {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/">
        <MainScreen />
      </Route>
      <Route path="/AllCostumers">
        <AllCostumers />
      </Route>
      <Route path="/userActivities">
        <AddingUser />
      </Route>
      <Route path="/Transections">
        <Transections />
      </Route>
    </Switch>
    {/* <SomeComponentOrElement>
      <Link to="/">Home</Link>
      <Link to="/something">Something</Link>
      <Link to="/somethingelse">Something Else</Link>
    </SomeComponentOrElement> */}
  </BrowserRouter>
)
}


export default App;




  // {/* <AddingUser /> */}
  //    {/* <MainScreen/> */}
  //   //  <AllCostumers />