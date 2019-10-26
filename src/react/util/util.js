const crypto = require("crypto")

export function randomString() {
    const length = Math.floor(Math.random() * 71);;
    const str = crypto.randomBytes(length).toString('hex');
    return str;
}