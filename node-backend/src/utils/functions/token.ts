import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
    email: string;
}

enum TokenType {
    ACCESS = "access",
    REFRESH = "refresh",
}

const TOKEN_CONFIG = {
    [TokenType.ACCESS]: {
        secret: () => process.env.ACCESS_TOKEN_SECRET || "access_secret",
        expiry: () => (process.env.ACCESS_TOKEN_EXPIRY || "15m") as jwt.SignOptions["expiresIn"],
    },
    [TokenType.REFRESH]: {
        secret: () => process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
        expiry: () => (process.env.REFRESH_TOKEN_EXPIRY || "7d") as jwt.SignOptions["expiresIn"],
    },
} as const;

/**
 * Token utility for generating and verifying JWTs.
 */
export const TokenUtils = {
    generateAccessToken(payload: TokenPayload): string {
        const config = TOKEN_CONFIG[TokenType.ACCESS];
        return jwt.sign(payload, config.secret(), { expiresIn: config.expiry() });
    },

    generateRefreshToken(payload: TokenPayload): string {
        const config = TOKEN_CONFIG[TokenType.REFRESH];
        return jwt.sign(payload, config.secret(), { expiresIn: config.expiry() });
    },

    verifyAccessToken(token: string): TokenPayload {
        const config = TOKEN_CONFIG[TokenType.ACCESS];
        return jwt.verify(token, config.secret()) as TokenPayload;
    },

    verifyRefreshToken(token: string): TokenPayload {
        const config = TOKEN_CONFIG[TokenType.REFRESH];
        return jwt.verify(token, config.secret()) as TokenPayload;
    },

    /**
     * Generate both access and refresh tokens at once.
     */
    generateTokenPair(payload: TokenPayload) {
        return {
            accessToken: TokenUtils.generateAccessToken(payload),
            refreshToken: TokenUtils.generateRefreshToken(payload),
        };
    },
} as const;

export type { TokenPayload };
