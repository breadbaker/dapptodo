import { useEffect } from 'react'
import { hooks, metaMask } from 'connectors/metaMask'
import { Accounts } from 'components/Accounts'
import { Chain } from 'components/Chain'
import { ConnectWithSelect } from 'components/ConnectWithSelect'
import { Status } from 'components/Status'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard({ onConnect }) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  // if (isActive) {
  //   useEffect(async () => {
  //     onConnect(useProvider())
  //   }, []);
  // }

  const provider = useProvider()

  if (provider && isActive) {
    onConnect(provider, isActive)
  }
  const ENSNames = useENSNames(provider)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  return (
    <div>
      <div>
        <b>MetaMask</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </div>
  )
}
