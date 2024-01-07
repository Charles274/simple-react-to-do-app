import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(evt) {
    evt.target.innerText === "Reset"
      ? this.props.resetColors()
      : this.props.changeLevel(evt.target.id);
  }

  render() {
    return (
      <button className="button" onClick={this.handleReset} id={this.props.id}>
        {this.props.name}
      </button>
    );
  }
}

export default Button;
