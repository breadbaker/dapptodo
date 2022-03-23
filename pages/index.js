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
    void metaMask.connectEagerly()
  }, [])

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard/>
        {isActive &&
          <TodoList account={accounts[0]} provider={provider} />
        }
      </div>
    </>
  )
}
