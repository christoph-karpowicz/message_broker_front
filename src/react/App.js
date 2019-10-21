import React, { useState, useEffect } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
const { ipcRenderer, remote } = window.require('electron');

let listenersDefined = false;

function App() {
  // State.
  const [message, setMessage] = useState("")
  const [consumed, setConsumed] = useState("")

  useEffect(() => {
    // console.log(1);
  })

  // IPC listeners.
  if (!listenersDefined) {

    ipcRenderer.once('lengthReply', (e, res) => {
      console.log(res)
      // setConsumed(res)
    })
    
    ipcRenderer.once('consumeReply', (e, res) => {
      console.log(res)
      setConsumed(res)
    })
  
    ipcRenderer.once('produceReply', (e, res) => {
      console.log(res)
      // setConsumed(res)
    })
    
    listenersDefined = true;
  }
  
  // App component methods.
  const produce = (msg) => {
    const data = {
      msg
    }
    
    ipcRenderer.send('produce', data)
  }

  const consume = () => {
    ipcRenderer.send('consume')
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "consume":
        consume()
        break;
      case "produce":
        produce(message)
        break;
      case "setMessage":
        setMessage(action.val)
        break;
    }
    return state
  }
  
  return (
    <div id="app">
      <StateProvider state={{message, consumed}} reducer={reducer}>
        <Main />
      </StateProvider>
    </div>
  )
}

export default App