import Form from "./components/form";
import "./App.css";
import DataDisplay from "./components/data";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/data" component={DataDisplay} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
