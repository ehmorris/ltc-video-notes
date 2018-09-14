import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notes: state.notes,
});

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: null,
    }
  }

  componentDidMount() {
    const notes = JSON.stringify(this.props.notes);

    const file = new Blob([notes], {
      type: 'text/plain'
    });

    const url = URL.createObjectURL(file);

    this.setState({
      fileURL: url,
    });
  }

  render() {
    return (
      <div>
        <a
          href={this.state.fileURL}
          download
          style={{
            textDecoration: 'inherit',
            color: 'inherit',
          }}
        >
          Download notes
        </a>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Download);
