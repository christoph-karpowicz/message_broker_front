const { net }       = require('electron');
const querystring   = require('querystring');

class Request {
    constructor(init) {
        this.method = init.method;
        this.server = init.server;
        this.data   = init.data;
        this.cb     = init.cb;
    }

    commit() {
        const self = this;
        
        return new Promise(function(resolve, reject) {
            const data  = querystring.stringify(self.data);
            let resBody = '';

            const request = net.request({
                method: self.method,
                protocol: self.server.protocol,
                hostname: self.server.host,
                port: self.server.port,
                path: '/',
            });

            request.on('response', (response) => {
                if (response.statusCode != 200) {
                    reject(response);
                }

                response.on('error', (error) => {
                    console.log(`ERROR: ${JSON.stringify(error)}`);
                    reject(error);
                });

                response.on('data', (chunk) => {
                    resBody += chunk.toString();
                });
                
                response.on('end', () => {
                    // console.log(`BODY: ${resBody}`);
                    resolve(JSON.parse(resBody));
                });
            });
            
            request.write(data);

            request.end();
        });
    }
}

module.exports = Request