import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class AddTask extends Component {
  state = {
    taskName: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.taskName);
    this.setState({taskName: ''});
  }

  // onChange = (e) => this.setState({taskName: e.target.value});
  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
        <input
          type="text"
          name="taskName"
          style={{flex: '10', padding: '5px'}}
          placeholder="Add Task"
          value={this.state.taskName}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default AddTask;