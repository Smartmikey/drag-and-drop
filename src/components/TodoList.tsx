import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../models'
import SimpleTodo from './SimpleTodo'
import "./styles.css"

interface props {
    todoListData: Todo[]
    setTodoListData: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<props> = ({todoListData, setTodoListData, completedTodos, setCompletedTodos}) => {
  return (
    <div className='container'>
      <Droppable droppableId='todosList'>

        {
          (provided, snapshot) => (
             <div className={`todos ${snapshot.isDraggingOver ? "dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos__heading'>
                Active tasks
              </span>
              {
                todoListData.map((todo, index) => (
                  <SimpleTodo 
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todoListData={todoListData}
                  setTodoListData={setTodoListData}
                  />
                  ))
                }
                {provided.placeholder}
            </div>
          )
        }

        </Droppable>

        <Droppable droppableId='todosRemove'>
        {
          (provided, snapshot)=> (
            <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className='todos__heading'>
                Completed tasks
              </span>
              {
                  completedTodos.map((todo, index) => (
                      <SimpleTodo 
                      index={index}
                      key={todo.id}
                      todo={todo}
                      todoListData={completedTodos}
                      setTodoListData={setCompletedTodos}
                      />
                  ))
              }
              {provided.placeholder}

            </div>
          )
        }
       
        </Droppable>
    </div>
  )
}

export default TodoList