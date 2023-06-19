import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Role } from './role.model';
import { Customer } from './customer.model';

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  modifiedOn?: string;

  @property({
    type: 'string',
  })
  createdOn?: string;

  @property({
    type: 'string',
    required: true
  })
  role: string;

  @property({
    type: 'string'
  })
  phoneNumber: string;

  @belongsTo(() => Customer)
  customerId: string;

  @belongsTo(() => Role)
  roleId: string;


  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  customer?: Customer;
  role?: Role;
}

export type UsersWithRelations = Users & UsersRelations;
