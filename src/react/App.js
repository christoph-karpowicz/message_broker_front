import React, { useState, useEffect } from 'react';
const { ipcRenderer, remote } = window.require('electron');

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    // console.log(message);
  })

  const produce = () => {
    let data = {
      msg: message
    }
    
    ipcRenderer.send('produce', data)
  }

  return (
    <div className="App">
      <section>
        <input id="message" className="" name="message" onChange={e => setMessage(e.target.value)} />
        <button id="produce" type="button" className="btn" onClick={produce}>
            Produce
        </button>
      </section>
    </div>
  )
}

export default App