import React, { useState, useEffect, useReducer } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
import { reducer } from './events/emitters';
const { ipcRenderer, remote } = window.require('electron');

let listenersDefined = false;

function App() {
  // State.
  const [message, setMessage] = useState("")
  const [consumed, setConsumed] = useState("")
  const [rstate, dispatch] = useReducer(reducer, [3, 4]);

  useEffect(() => {
    // console.log(1);
  })

  // IPC listeners.
  if (!listenersDefined) {

    ipcRenderer.on('consumeReply', (e, res) => {
      console.log(res)
      setConsumed(res.msg)
    })
    
    ipcRenderer.on('lengthReply', (e, res) => {
      console.log(res)
      // setConsumed(res)
    })
    
    ipcRenderer.on('peekReply', (e, res) => {
      console.log(res)
      setConsumed(res.msg)
    })

    ipcRenderer.on('peekAllReply', (e, res) => {
      dispatch({ 
        type: "updateQueue", 
        payload: { queue: res } 
      });
      // setConsumed(res.msg)
    })

    ipcRenderer.on('produceReply', (e, res) => {
      console.log(res)
      // setConsumed(res)
    })
    
    listenersDefined = true;
  }
  
  return (
    <div id="app">
      <StateProvider state={{message, consumed, setMessage}} reducer={[rstate, dispatch]}>
        <Main />
      </StateProvider>
    </div>
  )
}

export default App