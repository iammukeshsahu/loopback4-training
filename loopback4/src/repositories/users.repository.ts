import {inject, Getter} from '@loopback/core';
import {PostgresDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';
import {SoftCrudRepository} from 'loopback4-soft-delete';
import {AuthenticationBindings, IAuthUser} from 'loopback4-authentication';

export class UsersRepository extends SoftCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getCurrentUser: Getter<IAuthUser | undefined>,
  ) {
    super(Users, dataSource, getCurrentUser);
  }
}