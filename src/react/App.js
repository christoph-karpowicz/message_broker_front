import React, { useState, useEffect, useReducer } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
import { reducer } from './events/emitters';
import { setListeners } from './events/listeners';
const { ipcRenderer, remote } = window.require('electron');

let listenersDefined = false;

function App() {
  // State.
  const [message, setMessage] = useState("")
  const [consumed, setConsumed] = useState("")
  const [reload, setReload] = useState(false)
  const [rstate, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({type: "peekAll"})
  }, [])

  useEffect(() => {
    if (reload) {
      dispatch({type: "peekAll"})
      setReload(false)
    }
  }, [reload])

  // IPC listeners.
  if (!listenersDefined) {
    
    setListeners({
      setConsumed,
      setReload,
      dispatch
    });
    
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