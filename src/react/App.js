import React, { useState, useEffect } from 'react';
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
    setConsumed(res);
  })
  
  ipcRenderer.once('consumeReply', (e, res) => {
    console.log(res)
    setConsumed(res);
  })

  // App component methods.
  const produce = () => {
    const data = {
      msg: message
    }
    
    ipcRenderer.send('produce', data)
  }

  const consume = () => {
    ipcRenderer.send('consume')
  }
  
  return (
    <div id="main">
      <div id="producer">
        <textarea id="message" className="" name="message" onChange={e => setMessage(e.target.value)}></textarea>
      </div>
      <div id="consumer">{consumed}</div>
      <div id="producer-panel">
        <button id="produce" type="button" className="btn" onClick={produce}>
            Produce
        </button>
      </div>
      <div id="consumer-panel">
        <button id="consume" type="button" className="btn" onClick={consume}>
            Consume
        </button>
      </div>
      <div id="queue">queue</div>
    </div>
  )
}

export default App