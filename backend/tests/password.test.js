const { hashPassword, verifyPassword, isHashed } = require('../utils/password');

describe('password utils', () => {
    it('should hash a password without keeping the plain text', async () => {
        const hash = await hashPassword('1234');

        expect(isHashed(hash)).toBe(true);
        expect(hash).not.toContain('1234');
        expect(hash.length).toBeLessThanOrEqual(255);
    });

    it('should generate a different hash each time', async () => {
        expect(await hashPassword('1234')).not.toBe(await hashPassword('1234'));
    });

    it('should accept the right password', async () => {
        const hash = await hashPassword('1234');

        expect(await verifyPassword('1234', hash)).toEqual({ valid: true, needsRehash: false });
    });

    it('should reject the wrong password', async () => {
        const hash = await hashPassword('1234');

        expect(await verifyPassword('12345', hash)).toEqual({ valid: false, needsRehash: false });
    });

    it('should accept an old plain text password and ask for a rehash', async () => {
        expect(await verifyPassword('1234', '1234')).toEqual({ valid: true, needsRehash: true });
    });

    it('should reject a wrong old plain text password', async () => {
        expect(await verifyPassword('4321', '1234')).toEqual({ valid: false, needsRehash: false });
    });

    it('should reject missing values', async () => {
        expect((await verifyPassword(undefined, '1234')).valid).toBe(false);
        expect((await verifyPassword('1234', undefined)).valid).toBe(false);
        expect((await verifyPassword('', '')).valid).toBe(false);
    });

    it('should not accept the stored hash as the password', async () => {
        const hash = await hashPassword('1234');

        expect((await verifyPassword(hash, hash)).valid).toBe(false);
    });
});
