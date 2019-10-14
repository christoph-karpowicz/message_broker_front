const Request = require('./Request');

class API {

    constructor(host, port, protocol) {
        this.server = {
            host,
            port,
            protocol
        }
    }

    getLength() {
        let req = new Request({
            method: 'GET',
            server: this.server,
            data: {
                type: "length",
                queue: 0,
            },            
            cb: (chunk, resolve) => {
                if (chunk) {
                    var data = chunk.toString('utf8');
                    resolve(data)
                }
            },
        });
        return req.commit();
    }

    produce(data) {
        let req = new Request({
            method: 'POST',
            server: this.server,
            data: {
                queue: 0,
                type: "produce",
                message: data.msg
            },            
            cb: (chunk, resolve) => {
                if (chunk) {
                    var data = chunk.toString('utf8');
                    resolve(data)
                }
            },
        });
        return req.commit();
    }

}

module.exports = API