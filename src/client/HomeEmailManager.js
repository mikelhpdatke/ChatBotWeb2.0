import React, { Component } from "react";
import PropTypes from "prop-types";
import { notification, Icon } from "antd";
import { Checkbox } from "antd";
import EmailnQuestion from "./EmailnQuestion";
import { Button } from "antd";
import EmailList from "./EmailList";
import { HuanFetch } from "./Home";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="default"
      onClick={() => notification.close(key)}
    >
      Confirm
    </Button>
  );
  notification.open({
    message: "Chú ý",
    description: "Gửi Email thành công!",
    btn,
    key,
    onClose: close,
    style: { fontWeight: "bold", color: "red" }
  });
};

class HomeEmailManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askAns: [],
      emailList: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, val) {
    console.log('onChange in EmailManager')
    console.log(key, val);
    this.setState(state => {
      let oldState = state;
      oldState[key] = val;
      //console.log('in parenttt..');
      //console.log(oldState);
      return oldState;
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    HuanFetch("http://localhost:8080/api/sendEmails", this.state)
      .then(res => {
        console.log(res);
        openNotification();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-8">
            <EmailnQuestion onChange={this.handleChange} />
          </div>
          <div className="col">
            <EmailList onChange={this.handleChange} />
          </div>
        </div>
        <div className="row justify-content-around">
          <Button
            type="primary"
            onClick={this.handleSubmit}
            size="large"
            style={{ marginTop: "20px" }}
          >
            Gửi Email
          </Button>
        </div>
      </div>
    );
  }
}

export default HomeEmailManager;
