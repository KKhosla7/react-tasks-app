import React, { Component } from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

class Tasks extends Component {
    render() {
        return this.props.tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                toggleComplete={this.props.toggleComplete}
                deleteTask={this.props.deleteTask}
            />
        ));
    }
}

// PropTypes
Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Tasks;