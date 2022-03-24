import { useEffect } from 'react'
import MetaMaskCard from 'components/connectors/MetaMaskCard'
import TodoList from 'components/TodoList'


import { hooks, metaMask } from 'connectors/metaMask'
const { useAccounts, useIsActive, useProvider } = hooks

export default function Home() {
  const accounts = useAccounts()
  const isActive = useIsActive()
  const provider = useProvider()

  useEffect(() => {
    // void metaMask.connectEagerly()
  }, [])

  return (
    <>
      <div>
        <h1>Have you ever wanted to stay organized, but wanted to pay for it?</h1>
        <h2>Step 1 Connect Your Wallet</h2>
        <MetaMaskCard/>
        {isActive && provider &&
          <TodoList account={accounts[0]} provider={provider} />
        }
      </div>
    </>
  )
}
