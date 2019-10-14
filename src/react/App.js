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
  
  // App component methods.
  const produce = () => {
    let data = {
      msg: message
    }
    
    ipcRenderer.send('produce', data)
  }

  return (
    <div id="main">
      <div id="producer">
        <input id="message" className="" name="message" onChange={e => setMessage(e.target.value)} />
        <button id="produce" type="button" className="btn" onClick={produce}>
            Produce
        </button>
      </div>
      <div id="consumer">c{consumed}</div>
      <div id="queue">queue</div>
    </div>
  )
}

export default App