import React, { Component } from "react";
import PropTypes from "prop-types";
import { notification, Icon } from "antd";
import { Checkbox } from "antd";

import { Button } from 'antd';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="medium" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Chú ý',
    description: 'Bạn đã nhập xong tất cả các câu hỏi, hay chuyển sang Tab Thống Kê để Trainning',
    btn,
    key,
    onClose: close,
    style:{fontWeight:'bold',  color:'red'}
  });
};
const ipServer = "http://172.104.41.68:5060/select";
const updateServer = "http://172.104.41.68:5060/update";


class AskAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Question: "...",
      Answer: "..."
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('child..');
    //console.log(nextProps);
    this.setState({
      Question: nextProps.Question,
      Answer: nextProps.Answer
    });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "Question" || name === "Answer") {
      this.setState({ [name]: event.target.value }, () => {
        this.props.onChange(name, this.state[name]);
      });
      //console.log('this is error');
      //console.log(event.target.value);
      //console.log(this.state);
    }
  }

  render() {
    //console.log('hell');
    //console.log(this.state);
    //console.log(this.props);

    return (
      <div class="col">
        <div class="form-group">
          <label for="comment" style={{ color: "black", fontWeight: "bold" }}>
            Câu hỏi:
          </label>
          <textarea
            name="Question"
            class="form-control"
            rows="4"
            id="comment"
            value={this.state.Question}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label for="comment" style={{ color: "black", fontWeight: "bold" }}>
            Câu trả lời:
          </label>
          <textarea
            name="Answer"
            class="form-control"
            rows="9"
            id="comment"
            value={this.state.Answer}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const checkboxes = [
  {
    name: "Vị trí phòng, ban",
    key: "topic1",
    label: "1"
  },
  {
    name: "Điện thoại liên lạc",
    key: "topic2",
    label: "2"
  },
  {
    name: "Học phí",
    key: "topic3",
    label: "3"
  },
  {
    name: "Tuyển sinh",
    key: "topic4",
    label: "4"
  },
  {
    name: "Cuộc sống",
    key: "topic5",
    label: "5"
  },
  {
    name: "Câu lạc bộ",
    key: "topic6",
    label: "6"
  },
  {
    name: "Chuẩn tiếng Anh",
    key: "topic7",
    label: "7"
  },
  {
    name: "Thi và điểm",
    key: "topic8",
    label: "8"
  },
  {
    name: "Tín chỉ và đăng ký tín chỉ",
    key: "topic9",
    label: "9"
  },
  {
    name: "Học cải thiện và đăng ký",
    key: "topic10",
    label: "10"
  },
  {
    name: "Công tác sinh viên, đoàn thanh niên",
    key: "topic11",
    label: "11"
  },
  {
    name: "Khen thưởng, học bổng, kỷ luật",
    key: "topic12",
    label: "12"
  },
  {
    name: "Thông tin giảng viên",
    key: "topic13",
    label: "13"
  },
  {
    name: "Thông tin về các môn học",
    key: "topic14",
    label: "14"
  }
];

class CheckboxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map([
        ["1", false],
        ["2", false],
        ["3", false],
        ["4", false],
        ["5", false],
        ["6", false],
        ["7", false],
        ["8", false],
        ["9", false],
        ["10", false],
        ["11", false],
        ["12", false],
        ["13", false],
        ["14", false]
      ])
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    //console.log('child..');
    //console.log(nextProps.Checked);
    if (nextProps.CheckedProp == 0)
      this.setState({
        checkedItems: new Map([
          ["1", false],
          ["2", false],
          ["3", false],
          ["4", false],
          ["5", false],
          ["6", false],
          ["7", false],
          ["8", false],
          ["9", false],
          ["10", false],
          ["11", false],
          ["12", false],
          ["13", false],
          ["14", false]
        ])
      });
  }
  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () => {
        let arrVals = Array.from(this.state.checkedItems.values());
        //console.log('debug in checkItems....');
        //console.log(arrVals);
        this.props.onChange(
          "Topic",
          arrVals
            .map(x => {
              if (x == true) return 1;
              else return 0;
            })
            .join(",")
        );
      }
    );
  }
  render() {
    let dem = 0;
    return (
      <div class="col mx-auto" style={{ marginTop: "40px", color: "black" }}>
        <div class="row">
          {checkboxes.map(item => {
            //console.log(dem++);
            dem++;
            return (
              <div class="col-6" style={{ height: 45 }}>
                <div class="checkbox">
                  <label key={item.key}>
                    <Checkbox
                      name={item.label}
                      checked={this.state.checkedItems.get(item.label)}
                      onChange={this.handleChange}
                    />
                    {" " + item.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const FetchData = async () => {
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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        pos: 0,
        arr: [
          {
            Answer: "abc",
            AskingTime: "2018-11-09T00:00:00.000Z",
            Checked: 1,
            IdQuestion: 1,
            Question: "abc",
            Topic: "0,0,1...."
          }
        ]
      }
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
    console.log("llllll");
    console.log(key, val);
    let newData = this.state.data;
    let pos = this.state.data.pos;
    //console.log(this.state);
    newData.arr[pos][key] = val;
    if (key == "Topic") newData.arr[pos].Checked = 1;
    this.setState({
      data: newData
    });

    console.log(newData);
  }
  handleSubmit(e) {
    //alert(this.state);
    //openNotification();
    let pos = this.state.data.pos;
    /*
    HuanFetch(updateServer, {
      IdQuestion: this.state.data.arr[pos].IdQuestion,
      Answer: this.state.data.arr[pos].Answer,
      Topic: this.state.data.arr[pos].Topic
    }).then(ans => {
      console.log(ans);
    });
    */
    let nextPos = this.state.data.pos + 1;
    //console.log()
    if (this.state.data.pos === this.state.data.arr.length - 1) {
      // alert
      openNotification();
    } else {
      //nextPos = 0;
      this.setState(() => ({
        data: {
          pos: nextPos,
          arr: this.state.data.arr
        }
      }));
    }
    //console.log(this.state);
    e.preventDefault();
  }
  render() {
    let pos = this.state.data.pos;
    let Question = "";
    let Answer = "";
    if (this.state.data.arr[pos].Question != null)
      Question = this.state.data.arr[pos].Question;
    else Question = "";
    if (this.state.data.arr[pos].Answer != null)
      Answer = this.state.data.arr[pos].Answer;
    else Answer = "";
    //console.log(pos + 'wtffffff'+this.state.data.arr[pos].Checked);
    //let arrCheckBoxs = this.state.data.arr[pos].Topic;
    return (
      <div class="container">
        <div class="row justify-content-between">
          <AskAns
            onChange={this.handleChange}
            Question={Question}
            Answer={Answer}
          />
          <CheckboxContainer
            onChange={this.handleChange}
            CheckedProp={this.state.data.arr[pos].Checked}
          />
        </div>
        <br />
        <div class="row justify-content-around">
          <button
            type="button"
            class="btn btn-outline-success"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
