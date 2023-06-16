import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import { getUsers, getUserById, updateUser, createUser } from '../../api';
import { UserDetails, UPDATE_USER, CREATE_USER } from './testData/testData';

describe('Integration Test', () => {
  it('Should get users list', async () => {
    const resp = await getUsers();
    expect(resp).to.be.Array();
  });

  it('Should get users list by id', async () => {
    const resp = await getUserById(UserDetails.id);
    expect(resp).to.be.Object();
    expect(resp.id).to.equal(UserDetails.id);
  });

  it('Should create new user in database', async () => {
    const resp = await createUser(CREATE_USER);
    expect(resp).to.be.Object();
    expect(resp.firstName).to.equal(CREATE_USER.firstName);
    expect(resp.email).to.equal(CREATE_USER.email);
  });

  it('Should update users details', async () => {
    const resp = await updateUser(UserDetails.id, UPDATE_USER);
    expect(resp).to.be.Object();
    expect(resp.statusCode).to.equal(200);
    expect(resp.description).to.equal('User updated Successfully');

  });
});
