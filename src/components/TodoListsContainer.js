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
    newListItem = (e) => {
        var newTitle = document.getElementById('newTaskTitle').value;
        var newDescription = document.getElementById('newTaskDescription').value;
        var todo_list = {title: newTitle, description: newDescription, done: false}
        axios.post('http://localhost:3000/v1/todo_lists', {todo_list}).then((res) => {
            const newTodoLists = this.state.todoLists.slice();
            this.setState({todoLists: [res.data, ...newTodoLists]})
            document.getElementById('newTaskTitle').value = ''
            document.getElementById('newTaskDescription').value = ''
        }).catch((error) => console.log(error));
    }
    updateDoneStatus = (e, id) => {
        var isDone = e.currentTarget.checked;
        var payload = {isDone: isDone}
        axios.put(`http://localhost:3000/v1/todo_lists/${id}`, {payload}).then((res) => {
            const newTodoLists = this.state.todoLists.slice();
            const tdListIndex = this.state.todoLists.findIndex((x) => x.id === res.data.id);
            newTodoLists[tdListIndex] = res.data;
            this.setState({todoLists: newTodoLists});
        });
    }
    deleteItem = (e, id) => {
        axios.delete(`http://localhost:3000/v1/todo_lists/${id}`).then((res) => {
            const newTodoLists = this.state.todoLists.slice();
            const tdListIndex = this.state.todoLists.findIndex((x) => x.id === res.data.id);
            newTodoLists.splice(tdListIndex, 1);
            this.setState({todoLists: newTodoLists});
        });
    }
    render() {
        return (
            <div>
                <div className='taskContainer'>
                    <input
                        className='taskContainer'
                        id='newTaskTitle'
                        type='text'
                        placeholder='Task Title'
                        maxLength='125'
                    />
                </div>
                <div className='taskContainer'>
                    <input
                        className='taskContainer'
                        id='newTaskDescription'
                        type='text'
                        placeholder='Description'
                    />
                </div>
                <input type='submit' value='Save' onClick={this.newListItem}/>
                <div className='wrapItems'>
                    <ul className='listItems'>
                        {this.state.todoLists.map((tditem) => {
                            return (
                                <li className='item' tditem={tditem} key={tditem.id}>
                                    <input 
                                        className='itemCheckBox' 
                                        type='checkbox' id={tditem.id}
                                        checked={tditem.done}
                                        onChange={(e) => this.updateDoneStatus(e, tditem.id)}
                                    />
                                    <label className={'itemDisplay'+(tditem.done ? ' strike' : '')}>  {tditem.title} - </label>
                                    <span className={'itemDescription'+(tditem.done ? ' strike' : '')}>{tditem.description} </span>
                                    <button className='removeItemBtn' onClick={(e) => this.deleteItem(e, tditem.id)}>remove</button>
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