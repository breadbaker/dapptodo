import { useState, useEffect } from 'react'
import TodoItem from 'components/TodoItem'
import Contract  from '@truffle/contract'
import NewTodo from 'components/NewTodo'


// import styled from 'styled-components';

// const DescWrapper = styled.div`
//   background: white;
//   text-align: center;
//   padding: 40px;
//   h1 {
//     overflow-wrap: initial;
//   }
// `;


export default function TodoList({ account, provider }) {
    const [TodoListContract, setTodoListContract] = useState()
    const [todosCount, setTodosCount]  = useState(-1)
    const [todos, setTodos] = useState([])

    const loadData = async (list) => {
        let List = list || TodoListContract
        const count = await List.taskCount()
        const todoItems = []
        for (var i = 1; i <= count; i++) {
            // Fetch the task data from the blockchain
            const task = await List.tasks(i)
            todoItems.push(task)
        }
        setTodos(todoItems)
        setTodosCount(count)
    }

      useEffect( async () => {
        const res = await fetch(`/contracts/TodoList.json`)
        const contract = await res.json()
        const TodoContract = Contract(contract)
        TodoContract.setProvider(provider.provider)
        TodoContract.setNetwork(provider.provider.network)
        const list = await TodoContract.deployed()
        setTodoListContract(list)
    
        loadData(list)
      }, []
    )
    
    return (
      <div>
        {TodoListContract &&       
            <div>
                <h2>{`Total Todos: ${todosCount}`}</h2>
                <NewTodo addTodo={async (name) => {
                    await TodoListContract.createTask(name, {from: account})
                    loadData();
                }}
                /> 
            </div>
        }
        {TodoListContract && 
            todos.map(todo => {
                return (
                <TodoItem
                    key={todo.id}
                    completeTask={
                    async (id) => {
                        await TodoListContract.toggleCompleted(id, {from: account})
                        loadData()
                    }
                    }
                    {...todo} 
                />
                )
            })
        }
      </div>
    )
  }
  