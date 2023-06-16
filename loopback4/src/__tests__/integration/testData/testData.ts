export enum UserDetails {
    id=9
}

enum Role {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Subscriber = 'Subscriber'
  }

export const CREATE_USER = {
    id: 0,
    firstName: 'testing',
    middleName: '',
    lastName: '',
    email: 'testing@gmail.com',
    phoneNumber: '',
    role: Role.Subscriber,
    address: '',
}

export const UPDATE_USER = {
    firstName: 'testing',
    email: 'testing@gmail.com',
    role: Role.Admin
}