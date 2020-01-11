const { ipcRenderer } = window.require('electron');

export function setListeners(state) {

    ipcRenderer.on('addQueueReply', (e, res) => {
        console.log(res)
        if (res.success) {
            // state.setQueue(res.payload.data)
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        state.setReload(true);
    })
    
    ipcRenderer.on('consumeReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setConsumed(res.payload.data)
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        state.setReload(true);
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
            res.payload.message && state.setLog(res.payload.message);
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
            res.payload.message && state.setLog(res.payload.message);
        }
        
    })

    ipcRenderer.on('getQueueListReply', (e, res) => {

        console.log("getQueueListReply");
        console.log(res);
        if (res.success) {

            const parsedResponse = JSON.parse(res.payload.data);
            console.log(parsedResponse);
            
            state.setQueueList(parsedResponse.queueNames);
            // state.dispatch({
            //     type: "updateQueueList", 
            //     payload: { queueNames: parsedResponse.queueNames } 
            // });
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        console.log("------");
        
    })
    
    ipcRenderer.on('produceReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setReload(true);
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
    })

    ipcRenderer.on('removeQueueReply', (e, res) => {
        console.log(res)
        if (res.success) {
            // state.setQueue(res.payload.data)
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        state.setReload(true);
    })
    
}