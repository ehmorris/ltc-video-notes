import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clock from './Clock';

const mapStateToProps = state => ({
  time: state.time,
});

export default connect(
  mapStateToProps
)(Clock);
