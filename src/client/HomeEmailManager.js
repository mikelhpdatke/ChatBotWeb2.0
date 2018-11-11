import React, { Component } from "react";
import PropTypes from "prop-types";
import { notification, Icon } from "antd";
import { Checkbox } from "antd";
import EmailnQuestion from "./EmailnQuestion";
import { Button } from "antd";
import EmailList from "./EmailList";
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
      size="medium"
      onClick={() => notification.close(key)}
    >
      Confirm
    </Button>
  );
  notification.open({
    message: "Chú ý",
    description:
      "Bạn đã nhập xong tất cả các câu hỏi, hay chuyển sang Tab Thống Kê để Trainning",
    btn,
    key,
    onClose: close,
    style: { fontWeight: "bold", color: "red" }
  });
};
export const ipServer = "http://172.104.41.68:5060/select";
export const updateServer = "http://172.104.41.68:5060/update";

export const FetchData = async () => {
  const rawResponse = await fetch(ipServer, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  const content = await rawResponse.json();
  //console.log('wtfffffffffffffffffffff');
  //console.log(content);
  return content;
};

async function HuanFetch(url, json) {
  const myRequest = new Request(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  });
  return await fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.debug("Something went wrong on api server!");
      }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.debug(error);
    });
}

class PageNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: this.props.cur,
      max: this.props.max
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cur: nextProps.cur,
      max: nextProps.max
    });
  }
  render() {
    return (
      <div style={{ fontWeight: "bold", fontSize: "15px" }}>
        Số câu chưa trả lời: {this.state.max} <br />
        Đang xử lý câu: {this.state.cur + 1} / {this.state.max}
      </div>
    );
  }
}
class HomeEmailManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askAns:[],
      emailList:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let content = FetchData();
    content.then(content => {
      this.setState(() => ({
        data: {
          pos: 0,
          arr: content.rows.filter(x => x.Checked == 0)
        }
      }));
    });
  }
  handleChange(key, val) {
    //console.log(key, val);
    this.setState((state)=>{
      let oldState = state;
      oldState[key] = val;
      //console.log(oldState);
      return oldState;
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
   
    return (
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-8">
            <EmailnQuestion onChange={this.handleChange}/>
          </div>
          <div class="col">
            <EmailList onChange={this.handleChange}/>
          </div>
        </div>
        <div class="row justify-content-around">
          <Button
            type="primary"
            onClick={this.handleSubmit}
            size="Large"
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
