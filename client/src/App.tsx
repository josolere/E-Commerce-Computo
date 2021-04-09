import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import CreateProduct from './components/Create/CreateProduct/CreateProduct'
import CreateCategorie from './components/Create/CreateCategorie/CreateCategorie'

function App() {
  return (
    <Switch>
      <Route path='/createCat'>
        <CreateCategorie />
      </Route>
      <Route path='/create'>
        <CreateProduct />
      </Route>
      <Route path='/'>
        <div >
          <h1>Hola</h1>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
