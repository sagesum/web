import { AccessLevel, SingletonProto } from "egg";
import { createHmac, timingSafeEqual } from "node:crypto";

/** 默认有效期：7 天 */
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;


export interface TokenPayload {

    sub: string;

    exp: number;
}


@SingletonProto({
    accessLevel: AccessLevel.PUBLIC,
})
export default class AuthService {
    
    private get secret(): string {
        const secret = process.env.ADMIN_SECRET;
        if (!secret) {

            throw new Error('ADMIN_SECRET 未配置');
        }
        return secret;
    }

    issue(sub: string, ttlMs: number = DEFAULT_TTL_MS): { token: string; expiresAt: number } {
        const expiresAt = Date.now() + ttlMs;
        const payload: TokenPayload = { sub, exp: expiresAt };

        const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
        const signature = this.sign(encoded);

        return { token: `${encoded}.${signature}`, expiresAt };
    }


    verify(token?: string): TokenPayload | null {
        if (!token) return null;

        const [encoded, signature] = token.split('.');
        if (!encoded || !signature) return null;

        if (!this.safeEqual(signature, this.sign(encoded))) return null;

        try {
            const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as TokenPayload;
            if (typeof payload?.sub !== 'string') return null;
            if (typeof payload?.exp !== 'number' || Date.now() >= payload.exp) return null;
            return payload;
        } catch {
            return null;
        }
    }

    private sign(data: string): string {
        return createHmac('sha256', this.secret).update(data).digest('base64url');
    }


    safeEqual(a: string, b: string): boolean {
        const left = Buffer.from(a);
        const right = Buffer.from(b);
        if (left.length !== right.length) return false;
        return timingSafeEqual(left, right);
    }
}
