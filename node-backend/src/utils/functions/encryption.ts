import argon2 from "argon2";

/**
 * Encryption utility using Argon2 for secure password hashing.
 */
export const EncryptionUtils = {
    /**
     * Hash a plaintext value using Argon2id.
     */
    async encrypt(plaintext: string): Promise<string> {
        return argon2.hash(plaintext, {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4,
        });
    },

    /**
     * Verify a plaintext value against an Argon2 hash.
     */
    async decrypt(hash: string, plaintext: string): Promise<boolean> {
        return argon2.verify(hash, plaintext);
    },
} as const;
