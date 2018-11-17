import React, { Component } from "react";
import { Collapse } from "react-collapse";
const ipToGetEmail = 'http://172.104.41.68:5060/getQuestionAndAnswer';


const FetchData = async (ip) => {
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
      width: 0, height: 0,
      arr: [
        {
          isCollapsed: false,
          pos: 0,
          id: "ask1",
          ask: "Cho e hỏi muốn đăng ký kí túc xá khi nào mới đăng kí được ạ",
          ans:
            "Chào em! Vì quỹ phòng KTX ở cơ sở phía Bắc có hạn nên trước tiên sẽ ưu tiên cho những bạn thuộc các đối tượng ưu tiên trong tuyển sinh nhé! và vào ngày nhập học các em sẽ đc đăng ký KTX nhé!"
        },
        {
          isCollapsed: false,
          pos: 1,
          id: "ask2",
          ask: "Trường có xét tuyển khối D riêng hay chung với A và A1 ạ?",
          ans:
            "Điểm trúng tuyển sẽ theo từng tổ hợp môn thi (khối) như đã thông báo."
        },
        {
          isCollapsed: false,
          pos: 2,
          id: "ask3",
          ask:
            "Thầy cô cho em hỏi, e định nộp hồ sơ vào trường và nếu đậu em sẽ học ở Q1 hay Q9 vậy ạ?",
          ans: "Hiện tại xét tuyển, không phân chỉ tiêu theo từng khối em ạ!"
        },
        {
          isCollapsed: false,
          pos: 3,
          id: "ask4",
          ask: "Cho e hỏi khi nào cần nộp mấy cái thủ tục nhập học ạ?",
          ans:
            "Chào em! Sau khi em nộp giấy chứng nhận kết quả thi bản gốc về HV để xác nhận nhập học thì từ ngày 15/8 đến 19/8 HV sẽ gửi giấy báo nhập học về theo địa chỉ của em nhé! trên giấy báo sẽ có đầy đủ thông tin về thời gian, địa điểm nhập học. Em đọc thông báo sau để chuẩn bị hồ sơ nhập học trước nhé! http://portal.ptit.edu.vn/tuyensinh/thong-bao-ve-ke-hoach-xet-tuyen-va-nhap-hoc-dai-hoc-chinh-quy-dot-1-nam-2018/"
        },
        {
          isCollapsed: false,
          pos: 4,
          id: "ask5",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        },
        {
          isCollapsed: false,
          pos: 5,
          id: "ask5",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        },
        {
          isCollapsed: false,
          pos: 6,
          id: "ask6",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        },
        {
          isCollapsed: false,
          pos: 7,
          id: "ask7",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        },
        {
          isCollapsed: false,
          pos: 8,
          id: "ask8",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        },
        {
          isCollapsed: false,
          pos: 9,
          id: "ask9",
          ask:
            "Cho e hỏi là khi đăng ký xét tuyển vào trường thì em có được chọn 2nganh thuộc 2 khối khác nhau được không ạ? vd là ngành kế toán và ngành công nghệ kỹ thuật điện điện tử ấy ạ?",
          ans:
            "	Mỗi một nguyện vọng em đăng ký tương ứng với 1 ngành và tương ứng với 1 tổ hợp xét tuyển. Em có thể đăng ký các nguyện vọng với các ngành khác nhau hoặc là 1 ngành nhưng với các tổ hợp xét tuyển khác nhau nhưng phải đảm bảo được quy định theo thông báo xét tuyển của Học viện"
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.onChange("askAns", this.state.arr);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    FetchData(ipToGetEmail)
    .then()
    .catch()
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
      <div className="card" >
      
        <div className="card-body" >
        <h5 className="card-title">Câu hỏi</h5>
        <div style={{ height: this.state.height/3*1.7 + 'px', overflowY: "scroll" }}>
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
