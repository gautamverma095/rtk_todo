import React, { useState } from 'react'
import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '../redux/apiSlice'

const TodoList = () => {

    const [todo, setTodo] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({
            title: todo,
            completed:false
        })
        setTodo("")

    }
    const { data: todos, isLoading, isError, isSuccess, error } = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()

    // console.log(todos);
    const newItemSelection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter todo Item</label>
            <input type="text" value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="enter new todo"
            />
            <input type="submit" value="submit" />

        </form>
    let content
    if (isLoading) {
        content = <p>..Loading</p>
    }
    if (isSuccess) {
        content = todos.map((el) => {
            return (
                <div style={{"display" : "flex"}} key ={el.id}>
                    <h1>{el.title}</h1>
                    <h1>{el.completed}</h1>
                    <input type="checkbox"
                        checked={el.completed}
                        id={el.id}
                        onChange = {() => updateTodo({...el,completed:!el.completed})}
                         />
                    <button
                    onClick={() => deleteTodo({id:el.id})}
                    >delete</button>
                </div>
            )
        })
    }
    if (isError) {
        content = <p>{error}</p>
    }
    return (
        <div>
            <h1>Todo List</h1>
            {newItemSelection}
            {content}

        </div>
    )
}

export default TodoList