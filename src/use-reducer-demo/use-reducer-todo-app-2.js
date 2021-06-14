import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
const Action = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
}
// 액션 생성 함수 (핵심적인 내용만 전달받으면 전달해야 할 액션 객체를 대신 생성하여 반환해주는 함수, 사용이 필수는 아니며 그냥 유틸리티 함수)
const createAddTodoAction = (text) => {
    return {
        type: Action.ADD_TODO,
        payload: { id: Date.now(), text, completed: false }
    }
}

const createRemoveTodoAction = (id) => {
    return {
        type: Action.REMOVE_TODO,
        payload: id
    }
}

const createToggleTodoAction = (id) => {
    return {
        type: Action.TOGGLE_TODO,
        payload: id
    }
}

// ... 중간 코드 생략 ...

function TodoApp(props) {
    const [ todos, dispatch ] = useReducer(reducer, [])
    const [ todoText, setTodoText ] = useState("")

    return (
        <div>
            <input type="text" value={todoText} onChange={(e) => { setTodoText(e.target.value) }} />
            <button onClick={() => {
                // 액션 생성 함수 사용 (*)
                dispatch(createAddTodoAction(todoText))
                setTodoText('')
            }}>추가</button>
            <ol>
                {
                    todos.map(todo => {
                        return <li key={todo.id}>
                            <TodoItem todo={todo}
                                      toggleTodo={(id) => {
                                          // 액션 생성 함수 사용 (*)
                                          dispatch(createToggleTodoAction(id))
                                      }}
                                      removeTodo={(id) => {
                                          // 액션 생성 함수 사용 (*)
                                          dispatch(createRemoveTodoAction(id))
                                      }}
                            />
                        </li>
                    })
                }
            </ol>
        </div>
    )
}

ReactDOM.render(<TodoApp />, document.getElementBy