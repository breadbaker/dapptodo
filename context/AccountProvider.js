import React, { useState } from 'react';
// import Router from 'next/router';
// import { Tracker } from 'context/Tracker';

// import { message } from 'antd';

import { hooks, metaMask } from 'connectors/metaMask'
const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export const AccountContext = React.createContext();

const AccountProvider = (props) => {

    const chainId = useChainId()
    const accounts = useAccounts()
    const error = useError()
    const isActivating = useIsActivating()
  
    const isActive = useIsActive()
  
  
  
    const provider = useProvider()
  
    // if (provider && isActive) {
    //   onConnect(provider, isActive, accounts)
    // }
  
    const ENSNames = useENSNames(provider)
  
    // onConnect(provider, isActive, accounts)
  
  //   onConnect({
  
  //   })
  
  //     useEffect(() => {
  //   if (provider && isActive && accounts) {
  //   }
  //     }
  // , [])
  
    // attempt to connect eagerly on mount
    useEffect( async () => {
      const connec = await metaMask.connectEagerly()
      console.log('connec', connec)
      // onConnect(provider, isActive, accounts)
      // if (provider && isActive) {
      //   useEffect(async () => {
      //     // onConnect(useProvider())
      //   onConnect(provider, isActive, accounts)
    
      //   }, []);
      // }
    }, [])


//   const updateUser = async (data) => {
//     // await db.collection("users").doc(user.uid).update(data);

//     console.log('userRef')

//     // con
//     const usersRef = await db
//       .collection("users")
//       .doc(user.id)
//       .update(data);


//       message.info('Updated')
    


//     console.log('userRef',usersRef)

//     // await usersRef.update(data)
//     // if (query.docs.length === 0) {

//     setUser({
//       ...user,
//       ...data
//     })
//   }


  return (
    <AccountContext.Provider
      value={{
        metaMask,
        chainId,
        accounts,
        error,
        isActivating,
        isActive,
        provider,
        ENSNames
      }}
    >
      <>{props.children}</>
    </AccountContext.Provider>
  );
};

export default AccountProvider;
