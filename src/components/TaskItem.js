import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TaskItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.task.completed ?
      'line-through' : 'none'
    }
  }

  render() {
    const {id, title, completed} = this.props.task;

    return (
      <div style={ this.getStyle() }>
        <p>
          <input
            type="checkbox"
            onChange={this.props.toggleComplete.bind(this, id)}
            checked={completed}
          />
          {' '}
          { title }
          <button
            onClick={this.props.deleteTask.bind(this, id)}
            style={btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

// PropTypes
TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 8px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default TaskItem;