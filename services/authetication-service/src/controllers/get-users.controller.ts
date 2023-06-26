import {inject} from '@loopback/core';
import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {authorize} from 'loopback4-authorization';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import { PermissionKey } from '../permissions-keys';
import {STATUS_CODE} from '@sourceloop/core';

/**
 * OpenAPI response for ping()
 */
const GET_USERS_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'Get users details from db',
        properties: {
          message: {type: 'string'},
        },
      },
    },
  },
};


export class GetUsersController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private readonly req: Request,
  ) {}

  @authenticate(STRATEGY.BEARER, { passReqToCallback: true })
  @authorize({permissions: [PermissionKey.TodoCreator]})
  @get('/getUsers', {
    responses: {
      [STATUS_CODE.OK]: GET_USERS_RESPONSE,
    },
  })
  getUsers(): object {
    return {
      message: 'Api run successfully'
    };
  }
}
