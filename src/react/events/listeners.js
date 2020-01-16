const { ipcRenderer } = window.require('electron');

export function setListeners(state) {

    ipcRenderer.on('addQueueReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setLog(res.payload.message);
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        state.setReload(true);
    })
    
    ipcRenderer.on('consumeReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setConsumed(decodeURI(res.payload.data));
            // state.setLog(res.payload.message);
        }
        else {
            state.setConsumed("");
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
        let nodes;
        if (res.success) {
            const parsedResponse = JSON.parse(res.payload.data);
            nodes = parsedResponse.nodes.reverse();
            nodes.map(node => {
                node.message = decodeURI(node.message);
                return node;
            });
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
            nodes = [];
        }
        state.dispatch({
            type: "updateQueue", 
            payload: { queue: nodes }
        });
    })

    ipcRenderer.on('getQueueListReply', (e, res) => {
        console.log(res);
        if (res.success) {
            const parsedResponse = JSON.parse(res.payload.data);
            
            state.dispatch({
                type: "updateQueueList", 
                payload: { queueNames: parsedResponse.queueNames } 
            });
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
    })
    
    ipcRenderer.on('produceReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setReload(true);
            state.setLog(res.payload.message);
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
    })

    ipcRenderer.on('removeQueueReply', (e, res) => {
        console.log(res)
        if (res.success) {
            state.setLog(res.payload.message);
        }
        else {
            res.payload.message && state.setLog(res.payload.message);
        }
        state.setReload(true);
    })
    
}