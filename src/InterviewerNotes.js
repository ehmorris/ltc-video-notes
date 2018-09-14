import { connect } from 'react-redux';
import Notes from './Notes';

const mapStateToProps = state => ({
  notes: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

export default connect(
  mapStateToProps
)(Notes);
