import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";
import './App.css';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokemontcg from './components/Pokemontcg';

function App() {
  return (
    <div className = "App-head">
      <Router>
         <Switch>
           <Route exact path="/" render={(props) => <Pokemontcg {...props} />} />
         </Switch>
      </Router>
    </div>
  );
}

export default App;
