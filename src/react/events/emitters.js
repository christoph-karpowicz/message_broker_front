const { ipcRenderer } = window.require('electron');

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

// Global state reducer.
export const reducer = (state, action) => {
  switch (action.type) {
    case "consume":
      console.log("consume");
      consume()
      break;
    case "produce":
      produce(action.payload.message)
      break;
  }
  return null
}