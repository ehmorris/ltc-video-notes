import React, { Component } from 'react';
import styled from 'react-emotion';

const clamp = (number, min, max) => {
  return Math.max(min, Math.min(max, number));
}

class Button extends Component {
  constructor(props) {
    super(props);

    this.nudgeButton = this.nudgeButton.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.followMouse = this.followMouse.bind(this);

    this.state = {
      buttonX: 0,
      buttonY: 0,
    }
  }

  nudgeButton({movementX, movementY}) {
    this.setState({
      buttonX: clamp(movementX / 2, -5, 5),
      buttonY: clamp(movementY / 2, -5, 5),
    });
  }

  followMouse({movementX, movementY}) {
    this.setState({
      buttonX: clamp(this.state.buttonX + movementX, -5, 5),
      buttonY: clamp(this.state.buttonY + movementY, -5, 5),
    });
  }

  resetButton() {
    this.setState({
      buttonX: 0,
      buttonY: 0,
    });
  }

  render() {
    return (
      <div>
        {this.props.disabled &&
          <DisabledButtonContainer>
            {this.props.children}
          </DisabledButtonContainer>
        }

        {!this.props.disabled &&
          <div
            onClick={this.props.onClick}
            onMouseOver={this.nudgeButton}
            onMouseMove={this.followMouse}
            onMouseOut={this.resetButton}
            onMouseDown={this.resetButton}
            style={{
              ...buttonContainer,
              transform: `translate(${this.state.buttonX}px, ${this.state.buttonY}px)`,
              textShadow: `
                ${-this.state.buttonX}px
                ${-this.state.buttonY}px
                ${(Math.abs(this.state.buttonX) + Math.abs(this.state.buttonY)) / 2}px
                rgba(0, 0, 0, .2)`,
            }}
          >
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

export default Button;

const buttonContainer = {
  fontWeight: '600',
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform .2s ease, text-shadow .2s ease',
  padding: '1rem',
  margin: '-1rem',
};

const DisabledButtonContainer = styled('div')`
  font-weight: 600;
  cursor: not-allowed;
  user-select: none;
  text-decoration: none;
  color: inherit;
  opacity: .25;

  > * {
    pointer-events: none;
  }
`;
