import React, { useState, useEffect } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
const { ipcRenderer, remote } = window.require('electron');

function App() {
  // State.
  const [message, setMessage] = useState("")
  const [consumed, setConsumed] = useState("")

  useEffect(() => {
    // console.log(message);
  })

  // IPC listeners.
  ipcRenderer.once('lengthReply', (e, res) => {
    console.log(res)
    setConsumed(res)
  })
  
  ipcRenderer.once('consumeReply', (e, res) => {
    console.log(res)
    setConsumed(res)
  })

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

    console.log(state, action)
    
    switch (action.type) {
      case "consume":
        consume()
        return {message, consumed}
        break;
      case "produce":
        produce(action.val)
        return state
        break;
      case "setMessage":
        setMessage(action.val)
        break;
    }
  }
  
  return (
    <div id="app">
      <StateProvider initialState={{message, consumed}} reducer={reducer}>
        <Main />
      </StateProvider>
    </div>
  )
}

export default App