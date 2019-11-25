import { randomString } from '../util/util'
const { ipcRenderer } = window.require('electron');

// App component methods.
const consume = () => {
  ipcRenderer.send('consume')
}

const get = (index) => {
  ipcRenderer.send('get', index)
}

const getAll = () => {
  ipcRenderer.send('getAll')
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
    case "get":
      get(action.payload.index)
      break;
    case "getAll":
      getAll()
      break;
    case "produce":
      produce(action.payload.message)
      break;
    case "produceRandom":
      const randomMsg = randomString();
      produce(randomMsg)
      break;
    case "updateQueue":
      return action.payload.queue;
  }
  return state
}