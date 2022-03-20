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
import { hooks, metaMask } from 'connectors/metaMask'
const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function Home() {
  const [TodoList, setTodoList] = useState()
  const [todosCount, setTodosCount]  = useState(-1)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [account, setAccount] = useState()

  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  const loadData = async (list) => {
    let List = list || TodoList
    const count = await List.taskCount()
    const todoItems = []
    for (var i = 1; i <= count; i++) {
      // Fetch the task data from the blockchain
      const task = await List.tasks(i)
      console.log('task',task)
      todoItems.push(task)
    }
    // setTimeout(() => {
      
      setAccount(accounts[0])
      setTodos(todoItems)
      setTodosCount(count)
  }
  const loadUp = async () => {
    setLoaded(true)
    const res = await fetch(`/contracts/TodoList.json`)
    const contract = await res.json()
    const TodoContract = Contract(contract)
    TodoContract.setProvider(provider.provider)
    TodoContract.setNetwork(provider.provider.network)
    // const network  = await TodoContract.detectNetwork()
    // console.log('network', network)
    // try {
      const list = await TodoContract.deployed()
      setTodoList(list)

      loadData(list)
      // }, 10);

    // } catch (err) {
    //   console.log(err)
    // }
  }
  // const onConnect = async (provider, isActive, accounts) => {
  if (isActive && provider && !loaded ) {
    loadUp()
  }

  // const [newTodo, setNewTodo] = useState({})
  return (
    <>
      {/* <PriorityExample /> */}
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard/>
        {/* <WalletConnectCard /> */}
        {/* <CoinbaseWalletCard /> */}
        {/* <NetworkCard /> */}
        {TodoList && 
        
          <div>
            <h2>{`Total Todos: ${todosCount}`}</h2>
            <NewTodo addTodo={async (name) => {
              await TodoList.createTask(name, {from: account})
              loadData();
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
              completeTask={async (id) => {
                await TodoList.toggleCompleted(id, {from: account})
                loadData()
                // const newTodos = []
                // todos.forEach(todo => {
                //   newTodos.push({
                //     ...todo,
                //     completed: (todo.completed || id == todo.id) ? true : false
                //   })
                //   setTodos(newTodos)
                // })
              }

              }
              {...todo} />
          )
        })}
      </div>
    </>
  )
}
