import * as jwt from 'jsonwebtoken';
import { UserProfile } from '@loopback/security';


const expiryTime: string | undefined = process.env.EXPIRY_TIME || '';
const secretKey: string | undefined = process.env.SECRET_KEY || '';

export class TokenService {
    createJwtToken(userData: UserProfile): string {
        const token = jwt.sign({ userData }, 'secretKey', { expiresIn: '1h' });
        return token;
      }
}