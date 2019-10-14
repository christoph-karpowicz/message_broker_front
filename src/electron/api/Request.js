const { net } = require('electron');
const querystring = require('querystring');

class Request {

    constructor(init) {
        this.method = init.method;
        this.server = init.server;
        this.data = init.data;
        this.cb = init.cb;
    }

    commit() {
        return new Promise(function(resolve, reject) {
            const request = net.request({
                method: this.method,
                protocol: this.server.protocol,
                hostname: this.server.host,
                port: this.server.port,
                path: '/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }, res => {
                
                res.on('data', (chunk) => this.cb(chunk, resolve))
    
            })
    
            const req = querystring.stringify(this.data)
            
            request.write(req);
            request.end();
        }.bind(this))
    }

}

module.exports = Request