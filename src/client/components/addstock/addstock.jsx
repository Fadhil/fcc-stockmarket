import React, { Component } from 'react';

class AddStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ''
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleButtonInput = this.handleButtonInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleTextInput(e) {
    const { target: { value } } = e;
    const updatedState = Object.assign({}, this.state, { textInput: value });
    this.setState(updatedState);
  }

  handleButtonInput() {
    const { handler } = this.props;
    const { textInput } = this.state;

    if (textInput.trim() < 1) {
      this.clearState();
      return;
    }

    handler(textInput);
    this.clearState();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  clearState() {
    this.setState({
      textInput: ''
    });
  }

  render() {
    const { textInput } = this.state;

    return (
      <div className="addstock-container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-group">
            <input
              value={textInput}
              onChange={this.handleTextInput}
              placeholder="Add stock by symbol..."
              type="text"
            />
            <button type="submit" onClick={this.handleButtonInput}>Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddStock;
