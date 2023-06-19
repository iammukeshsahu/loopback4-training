import * as jwt from 'jsonwebtoken';

const expiryTime: string | undefined = process.env.EXPIRY_TIME || '';
const secretKey: string | undefined = process.env.SECRET_KEY || '';

export class TokenService {
    decryptCookie(cookie: string): string {
        const cookiePairs = cookie.split(';');
        for (const pair of cookiePairs) {
          const [key, value] = pair.trim().split('=');
          if (key === 'userId') {
              return value;
            }
        }
        return '';
    }
    
    createJwtToken(userId: string): string {
        const token = jwt.sign({ userId }, secretKey, { expiresIn: expiryTime });
        return token;
      }
}