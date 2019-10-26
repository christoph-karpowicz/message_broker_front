const { ipcRenderer } = window.require('electron');

export function setListeners(state) {

    ipcRenderer.on('consumeReply', (e, res) => {
        console.log(res)
        state.setConsumed(res.msg)
        state.setReload(true)
    })
        
    ipcRenderer.on('lengthReply', (e, res) => {
        console.log(res)
    })
        
    ipcRenderer.on('peekReply', (e, res) => {
        console.log(res)
        state.setConsumed(res.msg)
    })

    ipcRenderer.on('peekAllReply', (e, res) => {
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