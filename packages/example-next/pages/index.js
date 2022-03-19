import { useState, useEffect } from 'react'
// import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from 'components/connectors/MetaMaskCard'
import TodoItem from 'components/TodoItem'
import NewTodo from 'components/NewTodo'
// import TodoListJSON from 'build/TodoList'
import Contract  from '@truffle/contract'

// import NetworkCard from '../components/connectors/NetworkCard'
// import PriorityExample from '../components/connectors/PriorityExample'
// import WalletConnectCard from '../components/connectors/WalletConnectCard'

export default function Home() {

  const onConnect = async (provider, isActive) => {
    console.log('loaded up')
    console.log(provider)
    console.log(isActive)
    const res = await fetch(`/contracts/TodoList.json`)
    const contract = await res.json()
    const TodoContract = Contract(contract)
    TodoContract.setProvider(provider.provider)
    console.log(TodoContract)
    console.log('hello')
    try {
      TodoContract.deployed()
    } catch (err) {
      console.log(err)
    }
  }

  const [todos, setTodos] = useState([])
  // const [newTodo, setNewTodo] = useState({})
  return (
    <>
      {/* <PriorityExample /> */}
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard onConnect={onConnect} />
        {/* <WalletConnectCard /> */}
        {/* <CoinbaseWalletCard /> */}
        {/* <NetworkCard /> */}
        <NewTodo addTodo={(name) => {
            setTodos(todos.concat(
              [{
                name,
                completed: false,
                id: todos.length + 1
              }]
            ))
          }}
        />
        
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
