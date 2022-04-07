import React, { Component } from "react";
import axios from "axios";

class TodoListsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoLists: [],
        }
    }
    loadTodoLists(){
        axios.get('http://localhost:3000/v1/todo_lists').then((res) => {
            this.setState({ todoLists: res.data });
        }).catch((error) => console.log(error));
    }
    componentDidMount(){
        this.loadTodoLists();
    }
    render() {
        return (
            <div>
                <div className='taskContainer'>
                    <input
                        className='taskContainer'
                        type='text'
                        placeholder='Task Title'
                        maxLength='125'
                    />
                </div>
                <div className='taskContainer'>
                    <input
                        className='taskContainer'
                        type='text'
                        placeholder='Description'
                    />
                </div>
                <input type='submit' value='Save'/>
                <div className='wrapItems'>
                    <ul className='listItems'>
                        {this.state.todoLists.map((tditem) => {
                            return (
                                <li className='item' tditem={tditem} key={tditem.id}>
                                    <input className='itemCheckBox' type='checkbox'/>
                                    <label className='itemDisplay'>  {tditem.title} - </label>
                                    <span className='itemDescription'>{tditem.description} </span>
                                    <button className='removeItemBtn'>remove</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TodoListsContainer;