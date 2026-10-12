'use strict';
const crypto = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(crypto.scrypt);

const HASH_PREFIX = 'scrypt';
const SALT_BYTES = 16;
const KEY_BYTES = 64;

// Stored format: scrypt$<salt hex>$<key hex> (168 chars, fits the VARCHAR(255) Password column)
const hashPassword = async (password) => {
    const salt = crypto.randomBytes(SALT_BYTES);
    const key = await scrypt(String(password), salt, KEY_BYTES);
    return `${HASH_PREFIX}$${salt.toString('hex')}$${key.toString('hex')}`;
}

const isHashed = (stored) => typeof stored === 'string' && stored.startsWith(`${HASH_PREFIX}$`);

const safeEqual = (a, b) => a.length === b.length && crypto.timingSafeEqual(a, b);

// Passwords saved before hashing was introduced are still plain text.
// They are accepted once and flagged with needsRehash so the caller can replace them.
const verifyPassword = async (password, stored) => {
    if (typeof password !== 'string' || typeof stored !== 'string' || !stored.length) {
        return { valid: false, needsRehash: false };
    }

    if (!isHashed(stored)) {
        const valid = safeEqual(Buffer.from(password), Buffer.from(stored));
        return { valid, needsRehash: valid };
    }

    const [, saltHex, keyHex] = stored.split('$');
    if (!saltHex || !keyHex) {
        return { valid: false, needsRehash: false };
    }

    const expected = Buffer.from(keyHex, 'hex');
    const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length || KEY_BYTES);
    return { valid: safeEqual(actual, expected), needsRehash: false };
}

module.exports = {
    hashPassword,
    verifyPassword,
    isHashed
}
