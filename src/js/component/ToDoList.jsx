import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import '/workspaces/alondragerke-fspt53-todolist-fetch/src/styles/index.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { VscTrash } from "react-icons/vsc";
import { IoMdFlame } from "react-icons/io";
import { Link } from 'react-router-dom';


const makeRandomId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const user = 'alondragerke'; // Usuario específico

const getUserUrl = () => `https://playground.4geeks.com/apis/fake/todos/user/${user}`;

const createUser = async () => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify([]),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        await fetch(getUserUrl(), requestOptions);
    } catch (error) {
        console.error("Error creating the user: ", error);
    }
}

const ToDoList = () => {
    const history = useHistory();
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskCount, setTaskCount] = useState(0);

    const validate = (value) => {
        if (value.trim() !== '') {
            setInputValue(value);
        } else {
            alert('The input is not valid');
        }
    }

    const addItem = () => {
        if (inputValue.trim() !== '') {
            const newTask = {
                id: makeRandomId(10),
                label: inputValue,
                done: false
            };

            setTasks([...tasks, newTask]);
            setTaskCount((prevCount) => prevCount + 1);
            updateTasks([...tasks, newTask]);
            setInputValue('');
        } else {
            alert('Please enter a valid input');
        }
    }

    const removeItem = (id) => {
        const updatedTasks = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
        setTaskCount((prevCount) => prevCount - 1);
        updateTasks(updatedTasks);
    };

    const getTasks = async () => {
        try {
            const response = await fetch(getUserUrl(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const tasks = await response.json();
                setTasks(tasks);
                setTaskCount(tasks.length);
            } else if (response.status === 404) {
                createUser();
                setTasks([]);
                setTaskCount(0);
            } else {
                console.error("Error loading tasks: ", response.statusText);
            }
        } catch (error) {
            console.error("Error loading tasks: ", error);
        }
    }

    const updateTasks = async (updatedTasks) => {
        try {
            await fetch(getUserUrl(), {
                method: 'PUT',
                body: JSON.stringify(updatedTasks),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.ok);
        } catch (error) {
            console.error("Error updating tasks: ", error);
        }
    };

    const onDeleteAll = async () => {
        try {
            await fetch(getUserUrl(), {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    alert('User euphoria achieved! Clearing the slate... because who needs a to-do list when life is a mess anyway? 🚮✨');
                    history.push('/');
                }
            });
        } catch (error) {
            console.log("Error while trying to delete everything", error);
        }
    }

    useEffect(() => {
        createUser(); 
        getTasks();
    }, []); 

    useEffect(() => {
        if (tasks.length !== 0) {
            updateTasks(tasks);
        }
    }, [tasks]);

    return (
        <Container className="text-center">
            <Link to="/" className="text-center mt-5 title">to do</Link>
            <Row className="note-style">
                <InputGroup className="mb-3 input-style">
                    <Form.Control
                        placeholder="Strive for success, add your tasks here"
                        aria-label="Add your task"
                        aria-describedby="basic-addon2"
                        type="text"
                        onChange={e => validate(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addItem();
                            }
                        }}
                        value={inputValue}
                    />
                </InputGroup>
                {tasks.length > 0 ? (
                    <ul className="list-unstyled">
                        {tasks.map((task) => (
                            <li key={task.id} className="task-item">
                                <div className="line">
                                    <p>{task.label}</p>
                                </div>
                                <Button className="bg-white" onClick={() => removeItem(task.id)}>
                                    <VscTrash />
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="default-style p-5"> No tasks yet
                    </p>
                )}
                <div className="footer d-flex justify-content-between align-items-center">
                    <p className="text-left mt-3">Total tasks left: {taskCount >= 0 ? taskCount : 0}</p>
                    <Button className="bg-white border border-danger delete-all-button" onClick={onDeleteAll}>
                        <IoMdFlame className="flame-icon" /> Delete user <IoMdFlame className="flame-icon" />
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default ToDoList;
