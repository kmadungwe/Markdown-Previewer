import "./styles.css";
import React, { useState, useRef } from "react";
import ReactModal from "react-modal";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExpandArrowsAlt, faCopy } from "@fortawesome/free-solid-svg-icons";

library.add(faExpandArrowsAlt, faCopy);

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
  const [copySuccess, setCopySuccess] = useState("");

  const textAreaRef = useRef(null);

  function copyToClipBoard(e) {
    textAreaRef.current.select();
    document.execCommand("Copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

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
                ref={textAreaRef}
              >
                {updateMarkdown}
              </textarea>
              <div className="expandArrows">
                <div onClick={handleClick}>
                  <FontAwesomeIcon icon="expand-arrows-alt" />
                </div>
              </div>
              <div className="copyTo" onClick={copyToClipBoard}>
                <FontAwesomeIcon icon="copy" />
              </div>
              {copySuccess}
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
