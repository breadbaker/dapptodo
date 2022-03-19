import { useState } from 'react'
// import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from 'components/connectors/MetaMaskCard'
import TodoItem from 'components/TodoItem'
import NewTodo from 'components/NewTodo'

// import NetworkCard from '../components/connectors/NetworkCard'
// import PriorityExample from '../components/connectors/PriorityExample'
// import WalletConnectCard from '../components/connectors/WalletConnectCard'

export default function Home() {
  const [todos, setTodos] = useState([])
  // const [newTodo, setNewTodo] = useState({})
  return (
    <>
      {/* <PriorityExample /> */}
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
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
