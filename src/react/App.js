import React, { useState, useEffect, useReducer } from 'react';
import { StateProvider } from './State';
import Main from './main/Main';
import { reducer, Dispatch } from './events/emitters';
import { setListeners } from './events/listeners';

let listenersDefined = false;

function App() {
  // State.
  const [queue, setQueue]           = useState("")
  const [queueInput, setQueueInput] = useState("")
  const [message, setMessage]       = useState("")
  const [consumed, setConsumed]     = useState("")
  const [log, setLog]               = useState("")
  const [reload, setReload]         = useState(false)
  const [rstate, dispatch]          = useReducer(reducer, {
    nodes: [],
    queueList: [],
  });

  useEffect(() => {
    setReload(true);
  }, []);

  useEffect(() => {
    if (reload) {
      dispatch({type: "getAll", payload: { queue: queue }});
      dispatch({type: "getQueueList"});
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
      dispatch({type: "getAll", payload: { queue: queue }});
      setConsumed("");
  }, [queue]);
  
  // IPC listeners.
  if (!listenersDefined) {
    
    setListeners({
      setConsumed,
      setLog,
      setReload,
      dispatch
    });
    
    listenersDefined = true;
  }
  
  return (
    <div id="app">
      <StateProvider state={{
        queue, 
        setQueue, 
        queueInput, 
        setQueueInput,
        message, 
        consumed, 
        log, 
        setMessage
      }} reducer={[rstate, dispatch]}>
        <Main />
      </StateProvider>
    </div>
  )
}

export default App