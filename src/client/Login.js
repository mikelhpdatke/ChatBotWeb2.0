import React, { Component } from "react";
import './Login.css';

const style = {
    "btn": {
      "display": "inline-block",
      "*display": "inline",
      "*zoom": "1",
      "padding": "4px 10px 4px",
      "marginBottom": "0",
      "fontSize": "13px",
      "lineHeight": "18px",
      "color": "#333333",
      "textAlign": "center",
      "textShadow": "0 1px 1px rgba(255, 255, 255, 0.75)",
      "verticalAlign": "middle",
      "backgroundColor": "#f5f5f5",
      "backgroundImage": "linear-gradient(top, #ffffff, #e6e6e6)",
      "backgroundRepeat": "repeat-x",
      "filter": "progid:dximagetransform.microsoft.gradient(startColorstr=#ffffff, endColorstr=#e6e6e6, GradientType=0)",
      "borderColor": "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)",
      "border": "1px solid #e6e6e6",
      "WebkitBorderRadius": "4px",
      "MozBorderRadius": "4px",
      "borderRadius": "4px",
      "WebkitBoxShadow": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
      "MozBoxShadow": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
      "boxShadow": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
      "cursor": "pointer",
      "*marginLeft": ".3em"
    },
    "btn_hover": {
      "color": "#333333",
      "textDecoration": "none",
      "backgroundColor": "#e6e6e6",
      "backgroundPosition": "0 -15px",
      "WebkitTransition": "background-position 0.1s linear",
      "MozTransition": "background-position 0.1s linear",
      "MsTransition": "background-position 0.1s linear",
      "OTransition": "background-position 0.1s linear",
      "transition": "background-position 0.1s linear"
    },
    "btn_active": {
      "backgroundColor": "#e6e6e6"
    },
    "btn_disabled": {
      "backgroundColor": "#e6e6e6"
    },
    "btn_large": {
      "padding": "9px 14px",
      "fontSize": "15px",
      "lineHeight": "normal",
      "WebkitBorderRadius": "5px",
      "MozBorderRadius": "5px",
      "borderRadius": "5px"
    },
    "btn_primary": {
      "backgroundColor": "#4a77d4",
      "backgroundImage": "linear-gradient(top, #6eb6de, #4a77d4)",
      "backgroundRepeat": "repeat-x",
      "filter": "progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0)",
      "border": "1px solid #3762bc",
      "textShadow": "1px 1px 1px rgba(0,0,0,0.4)",
      "boxShadow": "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5)"
    },
    "btn_primary_hover": {
      "filter": "none",
      "backgroundColor": "#4a77d4"
    },
    "btn_primary_active": {
      "filter": "none",
      "backgroundColor": "#4a77d4"
    },
    "btn_primary_disabled": {
      "filter": "none",
      "backgroundColor": "#4a77d4"
    },
    "btn_block": {
      "width": "100%",
      "display": "block"
    },
    "": {
      "WebkitBoxSizing": "border-box",
      "MozBoxSizing": "border-box",
      "MsBoxSizing": "border-box",
      "OBoxSizing": "border-box",
      "boxSizing": "border-box"
    },
    "html": {
      "width": "100%",
      "height": "100%",
      "overflow": "hidden"
    },
    "body": {
      "width": "100%",
      "height": "100%",
      "fontFamily": "'Open Sans', sans-serif",
      "background": "-webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%)",
      "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 )"
    },
    "login": {
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "margin": "-150px 0 0 -150px",
      "width": "300px",
      "height": "300px"
    },
    "login_h1": {
      "color": "#fff",
      "textShadow": "0 0 10px rgba(0,0,0,0.3)",
      "letterSpacing": "1px",
      "textAlign": "center"
    },
    "input": {
      "width": "100%",
      "marginBottom": "10px",
      "background": "rgba(0,0,0,0.3)",
      "border": "1px solid rgba(0,0,0,0.3)",
      "outline": "none",
      "padding": "10px",
      "fontSize": "13px",
      "color": "#fff",
      "textShadow": "1px 1px 1px rgba(0,0,0,0.3)",
      "borderRadius": "4px",
      "boxShadow": "inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2)",
      "WebkitTransition": "box-shadow .5s ease",
      "MozTransition": "box-shadow .5s ease",
      "OTransition": "box-shadow .5s ease",
      "MsTransition": "box-shadow .5s ease",
      "transition": "box-shadow .5s ease"
    },
    "input_focus": {
      "boxShadow": "inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2)"
    }
  }
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let key = event.target.name;
    let val = event.target.value;
    this.setState(state => {
      state[key] = val;
      return state;
    });
    //console.log(key, val);
  }

  handleSubmit(event) {
    //alert('Your favorite flavor is: ' + this.state.user);
    event.preventDefault();
    //console.log(key, val);
    this.props.onSubmit(this.state.user, this.state.pass);
  }
  render() {
    return (
    <div className="body">
      <div style={style.login}>
        <h1 style={style.login_h1}>PTIT ChatBot</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="Username"
            required="required"
            value={this.state.user}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            required="required"
            value={this.state.pass}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            
            className="btn btn-primary btn-block btn-large"
          >
            Login
          </button>
        </form>
      </div>
      </div>
    );
  }
}
export default Login;
