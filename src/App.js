import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pokemontcg from './components/Pokemontcg';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <Pokemontcg {...props} />} />
        <Route
          exact
          path="/:pokemonId"
          render={(props) => <Pokemon {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
