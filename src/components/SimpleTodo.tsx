import React from 'react'
import { Todo } from '../models'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css"
import { Draggable } from 'react-beautiful-dnd';

interface props {
    todo: Todo;
    setTodoListData: React.Dispatch<React.SetStateAction<Todo[]>>;
    todoListData: Todo[];
    index: number;
}

const SimpleTodo:React.FC<props> = ({todo, setTodoListData, todoListData, index}) => {

    const handleDone = (id: number) => {
        setTodoListData(todoListData.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone}: todo))
    }

    const handleDelete = (id:number) => {
        setTodoListData(todoListData.filter(todo => todo.id !== id))
    }
  return (
      <Draggable draggableId={todo.id.toString()} index={index}>

        {(provided, snapshot)=> (
            <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>

            {
                todo.isDone ? (
                    <s className='todos__single--text'>
                {todo.todo}
                </s>
                ) : (
                    <span className='todos__single--text'>
                    {todo.todo}
                </span>
                )
            }
    
                <div>
                    <span className="icon">
                        <AiFillEdit />
                    </span>
                    <span className="icon"
                         onClick={()=> handleDelete(todo.id)}
                    >
                        <AiFillDelete />
                    </span>
                    <span className="icon"
                        onClick={()=> handleDone(todo.id)}
                    >
                        <MdDone />
                    </span>
                </div>
        </form>
        )}
      </Draggable>
  )
}

export default SimpleTodo