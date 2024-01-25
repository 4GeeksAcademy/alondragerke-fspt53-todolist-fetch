// import React, { useState, useEffect } from "react";
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { VscTrash } from "react-icons/vsc";

// const Input = ({ updateTasks }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [tasks, setTasks] = useState([]);
//     const [taskCount, setTaskCount] = useState(0);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [userUrl, setUserUrl] = useState(null);

//     useEffect(() => {
//         loadTasks();
//     }, [userUrl]);

//     const createUser = async () => {
//         try {
//             const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alondragerke', {
//                 method: 'POST',
//                 body: JSON.stringify([]),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             const data = await response.json();
//             console.log("User created successfully:", data);

//             const newUserUrl = data.url;
//             setUserUrl(newUserUrl);

//             if (newUserUrl) {
//                 loadTasks();
//             }
//         } catch (error) {
//             console.log("Error creating user:", error);
//         }
//     };

//     const loadTasks = async () => {
//         try {
//             if (!userUrl) {
//                 return;
//             }

//             const response = await fetch(`${userUrl}/tasks`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             const data = await response.json();
//             setTasks(data);
//             setTaskCount(data.length);
//             updateTasks(data);
//         } catch (error) {
//             console.log("Error loading tasks: ", error);
//         }
//     };

//     const addItem = async () => {
//         try {
//             if (!userUrl) {
//                 return;
//             }

//             const newItem = {
//                 name: inputValue,
//             };

//             const response = await fetch(`${userUrl}/tasks`, {
//                 method: 'POST',
//                 body: JSON.stringify(newItem),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             const data = await response.json();
//             const newTasks = [...tasks, data];
//             setTasks(newTasks);
//             setTaskCount(taskCount + 1);
//             updateTasks(newTasks);
//             setInputValue('');
//             setSuccessMessage('Item added successfully!');
//         } catch (error) {
//             setError(`Error adding item: ${error.message}`);
//         }
//     };

//     const removeItem = async (index) => {
//         try {
//             if (!userUrl) {
//                 return;
//             }

//             const taskId = tasks[index].id;

//             const response = await fetch(`${userUrl}/tasks/${taskId}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             await response.json();
//             const newTasks = tasks.filter((_item, i) => i !== index);
//             setTasks(newTasks);
//             setTaskCount(taskCount - 1);
//             updateTasks(newTasks);
//             setSuccessMessage('Item removed successfully!');
//         } catch (error) {
//             setError(`Error removing item: ${error.message}`);
//         }
//     };

//     const clearAllTasks = async () => {
//         try {
//             if (!userUrl) {
//                 return;
//             }

//             const response = await fetch(`${userUrl}/tasks`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             const data = await response.json();
//             updateTasks([]);
//             console.log("Tasks cleared successfully: ", data);
//         } catch (error) {
//             console.log("Error clearing tasks: ", error);
//         }
//     };

//     return (
//         <Container className="text-center note-style">
//             <InputGroup className="mb-3 input-style">
//                 <Form.Control
//                     placeholder="Cultivate greatness: what will bloom on your path to success?"
//                     aria-label="Add your task"
//                     aria-describedby="basic-addon2"
//                     type="text"
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             addItem();
//                         }
//                     }}
//                     value={inputValue}
//                 />
//             </InputGroup>
//             {tasks.length > 0 ? (
//                 <ul className="list-unstyled">
//                     {tasks.map((el, i) => (
//                         <li key={i} className="task-item">
//                             <div className="line">
//                                 <p>{el.name}</p>
//                             </div>
//                             <Button className="bg-white" onClick={() => removeItem(i)}>
//                                 <VscTrash />
//                             </Button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="default-style p-5"> No tasks yet, let's make today amazing! ✨ Add some tasks and conquer your goals! 🔥
//                 </p>
//             )}
//             <div className="footer">
//                 <p className="text-left mt-3">Total tasks left: {taskCount}</p>
//             </div>
//             <button onClick={createUser}>
//                 Create User
//             </button>
//             <button onClick={clearAllTasks}>
//                 Clear All Tasks
//             </button>
//             {error && <p className="error-message">{error}</p>}
//             {successMessage && <p className="success-message">{successMessage}</p>}
//         </Container>
//     );
// };

// export default Input;