import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Confirm from "./components/Confirm";
import Checkout from "./components/Checkout";
import Home from "./components/Home";

class BasicExample extends React.Component {
  constructor() {
    super();
    this.state = {
      stripe: null
    };
  }

componentDidMount() {
    
    this.setState({
      stripe: window.Stripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh")
    });
    }
  

  render() {
    const { stripe } = this.state;
    debugger;
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/checkout"
            render={() => <Checkout stripe={stripe} />}
          />
          <Route path="/confirm" component={Confirm} />
        </div>
      </Router>
    );
  }
}

render(<BasicExample />, document.getElementById("root"));
