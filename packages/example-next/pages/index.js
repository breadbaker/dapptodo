import { useState, useEffect } from 'react'
// import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from 'components/connectors/MetaMaskCard'
import TodoItem from 'components/TodoItem'
import NewTodo from 'components/NewTodo'
// import TodoListJSON from 'build/TodoList'
import Contract  from '@truffle/contract'
import { set } from 'react-hook-form'

// import NetworkCard from '../components/connectors/NetworkCard'
// import PriorityExample from '../components/connectors/PriorityExample'
// import WalletConnectCard from '../components/connectors/WalletConnectCard'

export default function Home() {
  const [TodoList, setTodoList] = useState()
  const [todosCount, setTodosCount]  = useState(-1)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const onConnect = async (provider, isActive) => {
    if (loading) {
      return
    } else {
      setLoading(true)
    }
    const res = await fetch(`/contracts/TodoList.json`)
    const contract = await res.json()
    const TodoContract = Contract(contract)
    TodoContract.setProvider(provider.provider)
    TodoContract.setNetwork(provider.provider.network)
    const network  = await TodoContract.detectNetwork()
    console.log('network', network)
    try {
      const list = await TodoContract.deployed()
      const count = await list.taskCount()
      const todoItems = []
      for (var i = 1; i <= count; i++) {
        // Fetch the task data from the blockchain
        const task = await list.tasks(i)
        console.log('task',task)
        todoItems.push(task)
      }
      setTodos(todoItems)
      setTodoList(list)
      setTodosCount(count)
    } catch (err) {
      console.log(err)
    }
  }

  // const [newTodo, setNewTodo] = useState({})
  return (
    <>
      {/* <PriorityExample /> */}
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard onConnect={onConnect} />
        {/* <WalletConnectCard /> */}
        {/* <CoinbaseWalletCard /> */}
        {/* <NetworkCard /> */}
        {TodoList && 
        
          <div>
            <h2>{`Total Todos: ${todosCount}`}</h2>
            <NewTodo addTodo={(name) => {
              TodoList.createTask(name)
              // setTodos(todos.concat(
              //   [{
              //     name,
              //     completed: false,
              //     id: todos.length + 1
              //   }]
              // ))
            }}
          /> 
          </div>
        }


        
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              completeTask={(id) => {
                const newTodos = []
                todos.forEach(todo => {
                  newTodos.push({
                    ...todo,
                    completed: (todo.completed || id == todo.id) ? true : false
                  })
                  setTodos(newTodos)
                })
              }

              }
              {...todo} />
          )
        })}
      </div>
    </>
  )
}
