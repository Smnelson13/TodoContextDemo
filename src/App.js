import React, { Component, createContext } from "react";
import Note from "./components/Note";
import "./App.css";

const MyContext = React.createContext();

class MyProvider extends Component {
  constructor() {
    super();
    this.state = {
      noteText: "",
      notes: []
    };
  }

  updateNoteText = noteText => {
    this.setState({ noteText: noteText.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      let notesArr = this.state.notes;
      notesArr.push(this.state.noteText);
      this.setState({ noteText: "" });
    }
  };

  deleteNote = index => {
    let notesArr = this.state.notes;
    notesArr.splice(index, 1);
    this.setState({ notes: notesArr });
  };

  addNote = () => {
    //if (this.state.noteText === "") { // context.handlers.handleKeyPress.
    if (this.state.noteText == "") {
      alert("Don't give me that empty textfield bullshit.");
      return;
    }
    let notesArr = this.state.notes;
    notesArr.push(this.state.noteText);
    this.setState({ noteText: "" });
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          handlers: {
            updateNoteText: this.updateNoteText,
            handleKeyPress: this.handleKeyPress,
            deleteNote: this.deleteNote,
            addNote: this.addNote
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="container">
          <div className="header">Todo Application</div>
          <MyContext.Consumer>
            {context => (
              <span test={context}>
                <div className="btn" onClick={() => context.handlers.addNote()}>
                  +
                </div>
                {context.state.notes.map((val, key) => {
                  return (
                    <Note
                      key={key}
                      text={val}
                      deleteMethod={() => context.handlers.deleteNote(key)}
                    />
                  );
                })}
                <input
                  type="text"
                  ref={input => {
                    this.textInput = input;
                  }}
                  className="textInput"
                  value={context.state.noteText}
                  placeholder="Type Todo Here."
                  onChange={noteText =>
                    context.handlers.updateNoteText(noteText)
                  }
                  onKeyPress={context.handlers.handleKeyPress.bind(this)}
                />
              </span>
            )}
          </MyContext.Consumer>
        </div>
      </MyProvider>
    );
  }
}

export default App;
