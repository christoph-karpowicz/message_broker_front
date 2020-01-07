import React, { useState, useEffect, useReducer } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
import { reducer } from './events/emitters';
import { setListeners } from './events/listeners';

let listenersDefined = false;

function App() {
  // State.
  const [queue, setQueue]       = useState("")
  const [message, setMessage]   = useState("")
  const [consumed, setConsumed] = useState("")
  const [log, setLog]           = useState("")
  const [reload, setReload]     = useState(false)
  const [rstate, dispatch]      = useReducer(reducer, []);

  useEffect(() => {
    dispatch({type: "getAll", payload: { queue: queue }})
  }, []);

  useEffect(() => {
    if (reload) {
      dispatch({type: "getAll", payload: { queue: queue }})
      setReload(false);
    }
  }, [reload]);

  // IPC listeners.
  if (!listenersDefined) {
    
    setListeners({
      setQueue,
      setConsumed,
      setLog,
      setReload,
      dispatch
    });
    
    listenersDefined = true;
  }
  
  return (
    <div id="app">
      <StateProvider state={{queue, setQueue, message, consumed, log, setMessage}} reducer={[rstate, dispatch]}>
        <Main />
      </StateProvider>
    </div>
  )
}

export default App