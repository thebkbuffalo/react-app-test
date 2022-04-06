import React, { Component } from "react";

class TodoListsContainer extends Component {
    render() {
        return (
            <div>
                <div className='taskContainer'>
                    <input
                        className='taskContainer'
                        type='text'
                        placeholder='input a new task and hit enter'
                        maxLength='125'
                    />
                </div>
                <div className='wrapItems'>
                    <ul className='listItems'></ul>
                </div>
            </div>
        )
    }
}

export default TodoListsContainer;