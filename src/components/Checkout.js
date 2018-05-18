import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";
import { withRouter } from "react-router-dom";

const createOptions = fontSize => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, Menlo, monospace",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class _SplitForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    console.log("here");
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => console.log(payload));
  }

  render() {
    const Button = withRouter(({ history }) => (
      <button
        type="submit"
        onClick={() => {
          history.push("/confirm");
        }}
      >
        Pay
      </button>
    ));
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Card number</span>
          <CardNumberElement {...createOptions(this.props.fontSize)} />
        </label>
        <label>
          <span>Expiration date</span>
          <CardExpiryElement {...createOptions(this.props.fontSize)} />
        </label>
        <label>
          <span>CVC</span>
          <CardCVCElement {...createOptions(this.props.fontSize)} />
        </label>
        <label>
          <span>Postal code</span>
          <PostalCodeElement {...createOptions(this.props.fontSize)} />
        </label>
        <Button />
      </form>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px",
      stripe: null
    };
    console.log(this.props);
    debugger;
    window.addEventListener("resize", () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== "14px") {
        this.setState({ elementFontSize: "14px" });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== "18px"
      ) {
        this.setState({ elementFontSize: "18px" });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    const { stripe } = this.props;
    debugger;
    return (
      <StripeProvider stripe={stripe}>
        <div className="Checkout">
          <h2>Card Split-field Form</h2>
          <Elements>
            <SplitForm fontSize={elementFontSize} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;
