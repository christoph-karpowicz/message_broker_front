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

    consume() {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "consume",
                queue: 0,
            },            
            cb: this.callback
        });
        return req.commit();
    }

    getLength() {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "length",
                queue: 0,
            },            
            cb: this.callback
        });
        return req.commit();
    }

    peek(index) {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "peek",
                index: index,
                queue: 0,
            },            
            cb: this.callback
        });
        return req.commit();
    }
    
    peekAll(length) {
        let reqArr = []
        
        for (let i = 0; i < length; i++) {
            reqArr.push(this.peek(i))
        }
        return reqArr;
    }
    
    produce(data) {
        const req = new Request({
            method: 'POST',
            server: this.server,
            data: {
                queue: 0,
                type: "produce",
                message: data.msg
            },            
            cb: this.callback
        });
        return req.commit();
    }

}

module.exports = API