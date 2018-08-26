import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notes from './Notes';

const mapStateToProps = state => ({
  notes: state.notes.filter(note => note.type === 'producer'),
});

export default connect(
  mapStateToProps
)(Notes);
