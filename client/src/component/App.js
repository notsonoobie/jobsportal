import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Register'
import About from './Pages/About'
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage'
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/about" render={()=> <About />} />
        <Route exact path="/register" render={()=> <Register />} />
        <Route exact path="/login" render={()=> <Login />} />
        <Route exact path="/" render={()=> <Home />} />
        <Route render={()=> <ErrorPage />} />
      </Switch>
    </div>
  );
}

export default App;
