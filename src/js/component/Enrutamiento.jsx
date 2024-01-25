import React from 'react';
import { BrowserRouter as Router, Route, Switch as RouterSwitch } from 'react-router-dom';
import ToDoList from './ToDoList';
import Home from './home';
import NotFound from './NotFound/NotFound';

const Enrutamiento = () => {
    return (
        <Router>
            <RouterSwitch>
            <Route exact path="/" component={Home} />
            <Route path="/tasks" component={ToDoList} />
            <Route path="*" component={NotFound} />
            </RouterSwitch>
      </Router>
    );
};

export default Enrutamiento;