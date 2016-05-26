import React, { Component } from 'react';

class AddStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ''
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleButtonInput = this.handleButtonInput.bind(this);
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
    handler(textInput);
    this.clearState();
  }

  clearState() {
    this.setState({
      textInput: ''
    });
  }

  render() {
    const { textInput } = this.state;

    return (
      <div>

        <div>
          <input
            value={textInput}
            onChange={this.handleTextInput}
            type="text"
          />

          <button onClick={this.handleButtonInput}>Add</button>
        </div>

      </div>
    );
  }
}

export default AddStock;
