class API {

    constructor() {

    }

    getLength() {
        const request = net.request({
            method: 'GET',
            protocol: 'http:',
            hostname: 'localhost',
            port: 8080,
            path: '/'
        })

        request.write({
            queue: 0,
            type: "length"
        });
        request.end();
    }

}

module.exports = API