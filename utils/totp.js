// utils/totp.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');

function generateUserAuthSetup() {
    const username = 'anon-' + crypto.randomBytes(4).toString('hex');
    const secret = speakeasy.generateSecret({
        name: `AnonSocial (${username})`
    });

    return new Promise((resolve, reject) => {
        QRCode.toDataURL(secret.otpauth_url, (err, qrCode) => {
            if (err) return reject(err);
            resolve({ username, secret: secret.base32, qrCode });
        });
    });
}

module.exports = { generateUserAuthSetup };
