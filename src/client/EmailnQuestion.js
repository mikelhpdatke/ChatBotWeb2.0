import React, { Component } from "react";
import { Collapse } from "react-collapse";
const ipGetQA = "http://172.104.41.68:5060/getQuestionAndAnswer";

const FetchData = async ip => {
  const rawResponse = await fetch(ip, {
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

class AskAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      arr: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.props.onChange("askAns", this.state.arr);
  }

  componentWillMount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    FetchData(ipGetQA)
      .then(res => {
        console.log("in QA fetch");
        console.log(res);
        if (!("rows" in res)) return Promise.reject("resnull");
        let arr = res.rows;
        for (let i = 0; i < arr.length; i++) {
          let ask = arr[i].Question;
          let ans = arr[i].Answer;
          let isCollapsed = false;
          let pos = i;
          let id = "ask" + i;
          this.setState(
            state => ({
              arr: [...this.state.arr, { ask, ans, isCollapsed, pos, id }]
            }),
            () => {
              console.log(this.state.arr);
            }
          );
        }
      })
      .catch(err => {
        console.log("get QA err");
        console.log(err);
      });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleChange(event) {
    let val = event.target.value;
    let pos = event.target.name;
    //console.log('??')
    //console.log(event.target);
    //console.log(event.target.value);
    this.setState(state => {
      //console.log('wtf');
      //console.log(pos);
      //console.log(state);
      let oldState = state;
      oldState.arr[pos].ans = val;
      //console.log(;
      return oldState;
    });
    this.props.onChange("askAns", this.state.arr);
    //console.log(this.state.arr[pos]);
  }
  handleClick(pos) {
    //let pos = event.target.name;
    console.log(pos);
    this.setState(state => {
      let oldState = state;
      oldState.arr[pos].isCollapsed = !oldState.arr[pos].isCollapsed;
      return oldState;
    });
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Câu hỏi</h5>
          <div
            style={{
              height: (this.state.height / 3) * 1.7 + "px",
              overflowY: "scroll"
            }}
          >
            {this.state.arr.map((x, index) => {
              let rows = x.ans.length / 90 + 1;
              //console.log(x.ans);
              //console.log(rows);
              return (
                <div id="accordion" key={index}>
                  <div className="card">
                    <div className="card-header" id={x.id + "x"}>
                      <h5 className="mb-0">
                        <p
                          className="card-text"
                          style={{ fontSize: 15 }}
                          onClick={() => {
                            this.handleClick(x.pos);
                          }}
                        >
                          {x.ask}
                        </p>
                      </h5>
                    </div>
                    <Collapse isOpened={x.isCollapsed}>
                      <textarea
                        style={{
                          marginLeft: "15px",
                          marginRight: "auto",
                          fontSize: 15,
                          width: "100%"
                        }}
                        className="card-body"
                        rows={rows}
                        value={x.ans}
                        onChange={this.handleChange}
                        name={x.pos}
                      />
                    </Collapse>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AskAns;
