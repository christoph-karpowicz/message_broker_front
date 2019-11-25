const { ipcRenderer } = window.require('electron');

export function setListeners(state) {

    ipcRenderer.on('consumeReply', (e, res) => {
        console.log(res)
        state.setConsumed(res.data)
        state.setReload(true)
    })
        
    ipcRenderer.on('lengthReply', (e, res) => {
        console.log(res)
    })
        
    ipcRenderer.on('getReply', (e, res) => {
        console.log(res)
        state.setConsumed(res.data)
    })

    ipcRenderer.on('getAllReply', (e, res) => {
        state.dispatch({ 
            type: "updateQueue", 
            payload: { queue: res } 
        });
    })

    ipcRenderer.on('produceReply', (e, res) => {
        console.log(res)
        state.setReload(true)
    })
    
}