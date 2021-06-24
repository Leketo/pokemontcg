import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokemontcg from './components/Pokemontcg';

function App() {
  return (
      <Router>
         <Switch>
           <Route exact path="/" render={(props) => <Pokemontcg {...props} />} />
         </Switch>
      </Router>
  );
}

export default App;
