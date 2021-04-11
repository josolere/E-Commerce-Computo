import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import PageNotFound from './PageNotFound';
import Home from './components/Home/Home';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/carrito' component={ShoppingCart} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
