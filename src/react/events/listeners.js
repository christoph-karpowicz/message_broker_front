const { ipcRenderer } = window.require('electron');

export function setListeners(state) {

    ipcRenderer.on('consumeReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setConsumed(res.payload.data)
        }
        else {
            state.setLog(res.payload.message);
        }
        state.setReload(true)
    })
        
    ipcRenderer.on('lengthReply', (e, res) => {
        console.log(res)
    })
        
    ipcRenderer.on('getReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setConsumed(res.payload.data)
        }
        else {
            state.setLog(res.payload.message);
        }
    })

    ipcRenderer.on('getAllReply', (e, res) => {

        console.log(res);
        if (res.success) {

            const parsedResponse = JSON.parse(res.payload.data);
            
            state.dispatch({ 
                type: "updateQueue", 
                payload: { queue: parsedResponse.nodes.reverse() } 
            });
        }
        else {
            state.setLog(res.payload.message);
        }
        
    })

    ipcRenderer.on('produceReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setReload(true)
        }
        else {
            state.setLog(res.payload.message);
        }
    })
    
}