import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models';

const  App:React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todoListData, setTodoListData] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()

    if(todo){
      setTodoListData([...todoListData, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const {source, destination} = result;

    

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = todoListData, complete = completedTodos;

    // check where the item was taken from and remove it from the index

    if(source.droppableId === "todosList"){
      add = active[source.index];

      active.splice(source.index, 1)
    }else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    // check where the element was dropped and add it to the index
    if(destination.droppableId == "todosList"){

      active.splice(destination.index, 0, add);
    }else {
      complete.splice(destination.index, 0, add);

    }

    setCompletedTodos(complete);
    setTodoListData(active);
  }

  
  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="App">
      <h1 className='heading'>Taskify</h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todoListData={todoListData} setTodoListData={setTodoListData} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
