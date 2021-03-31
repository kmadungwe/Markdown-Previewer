import "./styles.css";
import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const marked = require("marked");

const App = () => {
  return (
    <div>
      <MarkdownPreviewFunc />
    </div>
  );
};

export default App;

const MarkdownPreviewFunc = () => {
  const [markdown, setMarkdown] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function updateBox(markdown) {
    setMarkdown(markdown);
  }

  function handleModalClose() {
    setModalIsOpen({ modalIsOpen: false });
  }

  function handleClick() {
    setModalIsOpen({ modalIsOpen: true });
  }

  function updateMarkdown(markdown) {
    setMarkdown(markdown);
  }

  return (
    <div className="first">
      <div className="content-wrapper">
        <ReactModal
          isOpen={modalIsOpen.modalIsOpen}
          handleModalClose={handleModalClose}
          onRequestClose={() => {
            handleModalClose();
          }}
          updateBox={updateBox}
        >
          <textarea
            className="modalStyles"
            onChange={(e) => {
              updateMarkdown(e.target.value);
            }}
            value={markdown}
          >
            {markdown}
          </textarea>
        </ReactModal>
        <div className="new-blog-link">
          <button onClick={handleClick}>OpenModal!</button>
        </div>
        <div className="title">
          <h1>Markdown Previewer</h1>
        </div>
        <div className="box-wrappers">
          <div className="bothTAreaNPreview">
            <div>
              <textarea
                className="thisIsWhereTheTextGoes"
                onChange={(e) => {
                  updateMarkdown(e.target.value);
                }}
                value={markdown}
              >
                {updateMarkdown}
              </textarea>
            </div>
            <div className="previous">
              <div
                className="preview"
                dangerouslySetInnerHTML={{
                  __html: marked(`${markdown}`),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
