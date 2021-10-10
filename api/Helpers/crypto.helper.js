const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(Securitykey), initVector);
    let encryptedData = cipher.update(text);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    return encryptedData.toString('hex');
}

const decrypt = (text) => {
    const iv = Buffer.from(initVector, 'hex');
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(Securitykey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}