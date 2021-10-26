import "./App.css";
import Home from "./components/Home";
import EditPost from "./components/Edit";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/edit">
          <EditPost />
        </Route>
      </Router>
    </div>
  );
}

export default App;
