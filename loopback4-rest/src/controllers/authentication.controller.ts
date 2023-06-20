import { repository } from '@loopback/repository';
import {
    post,
    getModelSchemaRef,
    requestBody,
    response,
} from '@loopback/rest';
import { Users } from '../models';
import { UsersRepository } from '../repositories';
import { validateCredential } from '../services/validator';
import { Hasher } from '../services/password.hash'
import * as _ from 'lodash'
import { inject } from '@loopback/core';
import { Credentials } from '../repositories';
import { AuthenticationUserService } from '../services/user-service';
import { TokenService } from '../services/jwt-service';

export class UserAuthentication {
    constructor(
        @repository(UsersRepository)
        public usersRepository : UsersRepository,
        @inject('services.hasher')
        public hasher: Hasher,
        @inject('services.AuthenticationUserService')
        public authenticationUserService: AuthenticationUserService,
        @inject('services.TokenService')
        public tokenService: TokenService
      ) {}
    
    @post('/users/signup')
    @response(200, {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
    })
    async signup(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Users, {
                        title: 'NewUsers',

                    }),
                },
            },
        })
        users: Users,
    ): Promise<Users> {
        validateCredential(_.pick(users, ['email', 'password']));
        users.password = await this.hasher.hashPassword(users.password)
        return this.usersRepository.create(users);
    }

    @post('/users/login')
    @response(200, {
        description: 'Users model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        }
                    }
                }
            }}
    })
    async login(
        @requestBody({
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                format: 'email'
                            },
                            password: {
                                type: 'string',
                                minLength: 8
                            }
                        },
                        required: ['email', 'password']
                    }
                },
            },
        })
        users: Credentials,
    ) {
        const user = await this.authenticationUserService.verifyCredentials(users);
        const userName = this.authenticationUserService.convertToUserProfile(user);
        const token = this.tokenService.createJwtToken(userName);
        return Promise.resolve({ token})
    }
}