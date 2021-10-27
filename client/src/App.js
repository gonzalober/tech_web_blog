import "./App.css";
import Home from "./components/Home";
import Article from "./components/Article";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/full-article/:id">
          <Article />
        </Route>
        <Route exact path="/edit/:id">
          <EditPost />
        </Route>
      </Router>
    </div>
  );
};

export default App;
