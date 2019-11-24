const { net } = require('electron');
const querystring = require('querystring');
const axios = require('axios');

class Request {

    constructor(init) {
        this.method =   init.method;
        this.server =   init.server;
        this.data =     init.data;
        this.cb =       init.cb;
    }

    commit() {
        const self = this
        
        return new Promise(function(resolve, reject) {

            axios({
                method: self.method,
                url: 'http://localhost:8080',
                data: querystring.stringify(self.data)
            })
            .then((response) => {
                if (response.status == 200)
                    resolve(response.data)
                else
                    reject(response.data)
                // self.cb(response, resolve, reject)
            })
            .catch((error) => {
                reject(error)
                // self.cb(error, resolve, reject)
            });
            
        })
    }
}

module.exports = Request