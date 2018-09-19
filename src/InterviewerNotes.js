import { connect } from 'react-redux';
import Notes from './Notes';

const mapStateToProps = state => ({
  notes: state.notes.filter(note => note.type === 'interviewer' && !note.action).reverse(),
});

export default connect(
  mapStateToProps
)(Notes);
