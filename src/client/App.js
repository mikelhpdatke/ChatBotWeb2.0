import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import ThongKe from "./Thongke";
import Login from "./Login";
import HomeEmailManager from './HomeEmailManager'
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/thongke" component={() => <ThongKe />} />
      <Route path="/emailManager" component={HomeEmailManager} />
    </Switch>
  </main>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "admin",
      pass: "admin",
      ok: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleSubmit(user, pass) {
    console.log(user, pass);
    if (user == this.state.user && pass == this.state.pass) {
      this.setState({
        user: user,
        pass: pass,
        ok: 1
      });
    }
  }
  render() {
    if (this.state.ok == 0) return <Login onSubmit={this.handleSubmit} />;
    else
      return (
        <div>
          <Header />
          <Main />
        </div>
      );
  }
}

export default App;
