import { connect } from 'react-redux';
import Notes from './Notes';

const mapStateToProps = state => ({
  notes: state.notes.filter(note => note.type === 'interviewer'),
});

export default connect(
  mapStateToProps
)(Notes);
