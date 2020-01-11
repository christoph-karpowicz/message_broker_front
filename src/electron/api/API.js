const Request = require('./Request');

class API {

    constructor(host, port, protocol) {
        this.server = {
            host,
            port,
            protocol
        }
    }

    callback(response, resolve, reject) {
        console.log(response.data)
        if (response.status == 200)
            resolve(response.data)
        else
            reject(response.data)
    }

    addQueue(data) {
        const req = new Request({
            method: 'POST',
            server: this.server,
            data: {
                type: "addQueue",
                data: data.name
            },
            cb: this.callback
        });
        return req.commit();
    }

    consume(data) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "consume",
                queue: data.queue,
            },            
            cb: this.callback
        });
        return req.commit();
    }

    getLength(data) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "length",
                queue: data.queue,
            },            
            cb: this.callback
        });
        return req.commit();
    }

    get(data) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "get",
                index: data.index,
                queue: data.queue,
            },            
            cb: this.callback
        });
        return req.commit();
    }
    
    getAll(data) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "getAll",
                queue: data.queue,
            },            
            cb: this.callback
        });
        return req.commit();
    }
    
    getQueueList() {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "getAllQueueNames",
            },
            cb: this.callback
        });
        return req.commit();
    }
    
    produce(data) {
        const req = new Request({
            method: 'POST',
            server: this.server,
            data: {
                queue: data.queue,
                type: "produce",
                data: data.msg
            },
            cb: this.callback
        });
        return req.commit();
    }

    removeQueue(data) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "removeQueue",
                queue: data.name
            },            
            cb: this.callback
        });
        return req.commit();
    }

}

module.exports = API