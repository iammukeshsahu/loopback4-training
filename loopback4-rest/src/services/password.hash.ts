import { genSalt, hash, compare} from 'bcryptjs'

interface PasswordHash<T = string> {
    hashPassword(password: T): Promise<T>
    comparePassword(storedPassword: T, inputPassword: T): Promise<boolean>
}

export class Hasher implements PasswordHash<string> {
    comparePassword(storedPassword: string, inputPassword: string): Promise<boolean> {
        const isPasswordMatched = compare(inputPassword, storedPassword);
        return isPasswordMatched;
    }
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        return hash(password, salt);
    }
}