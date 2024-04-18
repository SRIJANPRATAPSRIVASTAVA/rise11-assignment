import React, { useEffect, useState } from 'react'
import { FaTasks, FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "../Todo.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Todos = () => {

    const [inputData, setinputData] = useState('');
    const [todos, setTodos] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [iseditItem, setIseditItem] = useState(null);
    const [user, setUser] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        console.log(user);
        if (!userInfo) navigate("/");

        const fetchTodos = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get("http://localhost:5531/api/v1/fetchalltodo", config);
                // if (data)
                setTodos(data.todos);
                setLoading(false);
            } catch (error) {
                console.log("error in fetching todo");
            }
        };

        // console.log(JSON.parse(localStorage.getItem("userInfo")));
        fetchTodos();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const addItem = () => {
        if (!inputData) {
            alert("Please fill the task !!")
        } else if (inputData && !toggle) {
            setTodos(
                todos.map((todo) => {
                    if (todo._id === iseditItem) {
                        return { ...todo, body: inputData }
                    }
                    return todo;
                })
            )
            setToggle(true);
            setinputData('');
            setIseditItem(null);
            setFetchAgain(true);
        }
        else {
            const dataObject = {
                _id: new Date().getTime().toString(), body: inputData
            }
            setTodos([...todos, dataObject]);
            setinputData('');
        }
    }

    const deleteItem = (ind) => {
        setTodos(todos => todos.filter((todo) => todo._id !== ind));
    }

    const editItem = (id) => {
        let newEditedTodo = todos.find((elem) =>
            elem._id === id
        )
        setToggle(false);
        setinputData(newEditedTodo.body);
        setIseditItem(id);
    }


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>

                        <figcaption>Add Your ToDo Here</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Items..." value={inputData} onChange={(e) => {
                            setinputData(e.target.value)
                        }} />
                        {toggle ? <i className="fa fa-plus add-btn" title='add item' onClick={addItem}></i> :
                            <i className="fa fa-edit add-btn" title='update item' onClick={addItem}></i>}
                    </div>

                    <div className="showItems">
                        {
                            !loading && todos && todos?.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem._id}>
                                        <h3>{elem.body}</h3>
                                        <div className="todo-btn">
                                            <i className='far fa-edit add-btn' title='Update Item' onClick={() => editItem(elem._id)}></i>
                                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(elem._id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={() => setTodos([])}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todos