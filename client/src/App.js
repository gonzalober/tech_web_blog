import "./App.css";
import Home from "./components/Home";
import Article from "./components/Article";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <h1 className="blog-header-logo text-dark">
            {`{The Tech-Corner Blog}`}
          </h1>
        </a>
        <span className="navbar-toggler-icon"></span>
      </nav>
      <p></p>
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
