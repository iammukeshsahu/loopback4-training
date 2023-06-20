import { HttpErrors } from '@loopback/rest';
import * as isEmail from 'isemail';
import { Credentials } from '../repositories';

export function validateCredential(credentials: Credentials) {
    if(!isEmail.validate(credentials.email)) {
        throw new HttpErrors.UnprocessableEntity('Email is invalid')
    }
    if(credentials.password.length < 8) {
        throw new HttpErrors.UnprocessableEntity('Password length should be greater than 8')
    }
}