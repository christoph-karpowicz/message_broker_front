const Request = require('./Request');

class API {

    constructor(host, port, protocol) {
        this.server = {
            host,
            port,
            protocol
        }
    }

    consume() {
        const req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "consume",
                queue: 0,
            },            
            cb: (chunk, resolve) => {
                if (chunk) {
                    const data = chunk.toString('utf8');
                    resolve(JSON.parse(data))
                }
            },
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
            cb: (chunk, resolve) => {
                if (chunk) {
                    const data = chunk.toString('utf8');
                    resolve(JSON.parse(data))
                }
            },
        });
        return req.commit();
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
            cb: (chunk, resolve) => {
                if (chunk) {
                    const data = chunk.toString('utf8');
                    resolve(JSON.parse(data))
                }
            },
        });
        return req.commit();
    }

}

module.exports = API