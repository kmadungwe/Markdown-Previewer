import React, { Component } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
const marked = require("marked");

export default class MarkdownPreviewClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: "",
      modalIsOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      modalIsOpen: false,
    });
  }

  handleClick() {
    this.setState({ modalIsOpen: true });
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }

  render() {
    const inputStyle = {
      width: "400px",
      height: "50vh",
      padding: "10px",
    };

    const outputStyle = {
      width: "400px",
      height: "50vh",
      backgroundColor: "#DCDCDC",
      padding: "10px",
    };

    return (
      <div className="App">
        <div className="container">
          <div className="row mt-4">
            <div className="col text-center">
              <Modal
                modalIsOpen={this.state.modalIsOpen}
                handleModalClose={this.handleModalClose}
              />
              <div className="new-blog-link">
                <a onClick={this.handleClick}>OpenModal!</a>
              </div>
              <h1>
                <div className="Badge text-align-center" variant="light">
                  Markdown Previewer
                </div>
              </h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="col text-center">
                <h4>
                  <div className="Badge text-align center" variant="secondary">
                    Markdown Left
                  </div>
                </h4>
              </div>
              <div className="mark-input">
                <textarea
                  className="input"
                  style={inputStyle}
                  value={this.state.markdown}
                  onChange={(e) => {
                    this.updateMarkdown(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col text-center">
                <h4>
                  <div className="Badge text-align center" variant="secondary">
                    Markdown Right
                  </div>
                </h4>
              </div>
              <div
                style={outputStyle}
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.markdown),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%",
        width: "800px",
      },
      overlay: {
        backgroundColor: "rgba(1,1,1,0.75)",
      },
    };
  }
  render() {
    return (
      <div>
        <ReactModal
          style={this.customStyles}
          isOpen={this.props.modalIsOpen}
          onRequestClose={() => {
            this.props.handleModalClose();
          }}
        >
          <h1>Is Open</h1>
        </ReactModal>
      </div>
    );
  }
}
