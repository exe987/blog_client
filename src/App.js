import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Posts from "./components/Posts";
import ReadPost from "./components/ReadPost";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container section is-medium has-background-success is-fluid mt-6">
          <div className="columns is-centered">
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/create" component={CreatePost} />
              <Route path="/edit/:id" component={EditPost} />
              <Route path="/read/:id" component={ReadPost} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Provider>
    </Router>
  );
}

export default App;
