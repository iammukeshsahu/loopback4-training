import { UserService } from '@loopback/authentication';
import { Users } from '../models';
import { Credentials, UsersRepository } from '../repositories';
import { UserProfile, securityId } from '@loopback/security';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/core';
import { Hasher } from './password.hash';

export class AuthenticationUserService implements UserService<Users, Credentials> {
    constructor(
        @repository(UsersRepository)
        public usersRepository : UsersRepository,
        @inject('services.hasher')
        public hasher: Hasher
      ) {}
    async verifyCredentials(credentials: Credentials): Promise<Users> {
        const userData = await this.usersRepository.findOne({
            where: {
                email: credentials.email
            }
        });
        if(!userData) {
            throw new HttpErrors.NotFound('Users not found')
        }
        const passwordMatched = await this.hasher.comparePassword(userData.password, credentials.password)
        if(!passwordMatched) {
            throw new HttpErrors.Unauthorized('Password is not valid')
        }
        return userData;
    }
    convertToUserProfile(user: Users): UserProfile {
        let userName: string = '';
        if(user.firstName) {
            userName = user.firstName
        }
        if(user.lastName) {
            userName = user.firstName ? `${user.firstName} ${user.lastName}` : user.lastName
        }
        return { id: `${user.id}`, name: userName, [securityId]: `${user.id}` }
    }
    
}