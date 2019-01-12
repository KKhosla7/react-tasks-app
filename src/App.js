import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import About from "./components/views/About";
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";

// import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    axios
      .get(`${TASKS_URI}`)
      .then(response => this.setState({tasks: response.data}))
      .catch(error => console.log(error));
  }

  // Toggle Complete
  toggleComplete = (id) => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    const task = this.state.tasks.find(task => task.id === id);

    axios.put(`${TASKS_URI}/${id}`, task)
      .then(response => this.setState({tasks: tasks}))
      .catch(error => console.log(error));
    /*
    this.setState({tasks: this.state.tasks.map(task =>  {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    })});
    */
  }

  // Delete Task
  deleteTask = (id) => {
    axios.delete(`${TASKS_URI}/${id}`)
      .then(response => this.setState({ tasks: [...this.state.tasks.filter(task => task.id !== id)] }))
      .catch(error => console.log(error));
    // this.setState({tasks: [...this.state.tasks.filter(task => task.id !== id)]});
  }

  // Add Task
  addTask = (title) => {
    if (title) {
      axios.post(`${TASKS_URI}`, {
        title,
        completed: false
      })
        .then(response => this.setState({ tasks: [...this.state.tasks, response.data] }))
        .catch(error => console.log(error));
    } else {
      alert("Error: Enter Task");
    }
    /*
    const newTask = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({tasks: [...this.state.tasks, newTask]})
    */
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTask addTask={this.addTask} />
                <Tasks
                  tasks={this.state.tasks}
                  toggleComplete={this.toggleComplete}
                  deleteTask={this.deleteTask}
                />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

const TASKS_URI = "http://spring-tasks-app.herokuapp.com/tasks-app/api/tasks";

export default App;