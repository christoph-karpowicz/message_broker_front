const { ipcRenderer } = window.require('electron');

// App component methods.
const consume = () => {
  ipcRenderer.send('consume')
}

const peek = (index) => {
  ipcRenderer.send('peek', index)
}

const peekAll = (index) => {
  ipcRenderer.send('peekAll', index)
}

const produce = (msg) => {
  const data = {
    msg
  }

  ipcRenderer.send('produce', data)
}

// Global state reducer.
export const reducer = (state, action) => {
  switch (action.type) {
    case "consume":
      consume()
      break;
    case "peek":
      peek(action.payload.index)
      break;
    case "peekAll":
      peekAll()
      break;
    case "produce":
      produce(action.payload.message)
      break;
    case "updateQueue":
      return action.payload.queue;
  }
  return state
}