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
export const ipServer = "http://172.104.41.68:5060/select";
export const updateServer = "http://172.104.41.68:5060/update";
export const deleteServer ="http://172.104.41.68:5060/del";

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
        console.log(this.state);
      });
      //console.log('this is error');
      //console.log(event.target.value);
      //
    }
  }

  render() {
    //console.log('hell');
    //console.log(this.state);
    //console.log(this.props);

    return (
      <div className="col-6">
        <div className="form-group">
          <label style={{ color: "black", fontWeight: "bold" }}>
            Câu hỏi:
          </label>
          <textarea
            name="Question"
            className="form-control"
            rows="4"
            value={this.state.Question}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label style={{ color: "black", fontWeight: "bold" }}>
            Câu trả lời:
          </label>
          <textarea
            name="Answer"
            className="form-control"
            rows="9"
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
      <div className="col-6 mx-auto" style={{ marginTop: "40px", color: "black" }}>
        <div className="row">
          {checkboxes.map((item, index) => {
            //console.log(index);
            dem++;
            return (
              <div className="col-6" style={{ height: 45 }} key={index}>
                <div className="checkbox">
                  <label>
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

export async function HuanFetch(url, json) {
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
  constructor(props){
    super(props);
    this.state = {
      cur:this.props.cur,
      max:this.props.max
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      cur:nextProps.cur,
      max:nextProps.max
    })
  }
  render() {
    return (
      <div style={{fontWeight:'bold', fontSize:'15px'}}>
        Số câu chưa trả lời: {this.state.max} <br/>
        Đang xử lý câu: {this.state.cur + 1} / {this.state.max}
      </div>
    )
  }
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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIgnore = this.handleIgnore.bind(this);
  }

  componentWillMount() {
    let content = FetchData();
    content.then(content => {
      console.log(content);
      if ('rows' in content)
      this.setState(() => ({
        data: {
          pos: 0,
          arr: content.rows.filter(x => x.Checked == 0)
        }
      }));
    });
  }
  handleChange(key, val) {
    console.log("onUpdate AskAns");
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
    
    HuanFetch(updateServer, {
      IdQuestion: this.state.data.arr[pos].IdQuestion,
      Answer: this.state.data.arr[pos].Answer,
      Topic: this.state.data.arr[pos].Topic
    }).then(ans => {
      console.log('Success');
      console.log(ans);
    });
    
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

  handleDelete(e){
    let pos = this.state.data.pos;
    HuanFetch(deleteServer, {
      IdQuestion: this.state.data.arr[pos].IdQuestion,
    }).then(ans => {
      console.log('Delete Success');
      console.log(ans);
    }).catch(err => {
      console.log('Delete Error');
      console.log(err);
    });
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

  handleIgnore(e){
    let pos = this.state.data.pos;
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
      <div className="container">
        <div className="row justify-content-between">
          <AskAns
            onChange={this.handleChange}
            Question={Question}
            Answer={Answer}
          />
          <CheckboxContainer
            onChange={this.handleChange}
            CheckedProp={this.state.data.arr[pos].Checked}
          />
          <PageNumber cur={this.state.data.pos} max={this.state.data.arr.length}/>
        </div>
       
        <div className="row justify-content-around">
          

          <Button name='submit' type="primary" onClick={this.handleSubmit} size="default">
          Lưu
        </Button>
      


         <Button name='delete' type="danger" onClick={this.handleDelete} size="default">
          Xoá 
        </Button>

        <Button name='ignore' type="default" onClick={this.handleIgnore} size="default">
          Bỏ qua 
        </Button>
        </div>
      </div>
    );
  }
}

export default Home;
