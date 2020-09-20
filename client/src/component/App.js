import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage'
import Jobs from './Pages/Jobs'
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/about" render={(routeProps)=> <About {...routeProps} />} />
        <Route exact path="/register" render={(routeProps)=> <Home {...routeProps} />} />
        <Route exact path="/login" render={(routeProps)=> <Login {...routeProps} />} />
        <Route exact path="/jobs" render={(routeProps)=> <Jobs {...routeProps} />} />
        <Route exact path="/" render={(routeProps)=> <Home {...routeProps} />} />
        <Route render={(routeProps)=> <ErrorPage {...routeProps} />} />
      </Switch>
    </div>
  );
}

export default App;
