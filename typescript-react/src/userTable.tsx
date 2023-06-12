import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api/api';




enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber'
}

interface User {
  id: number
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  address?: string;
  createdOn?: Date;
  modifiedOn?: Date;
}




const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: Role.Subscriber,
    address: '',
  });
  useEffect(() => {
    getUsers().then((user) => {
      setUsers(user);
    })
  }, [])

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSave = async (index: number) => {
    setEditingIndex(null);
    const updatedUser = { ...users[index] };
    const firstNameInput = document.getElementById(`firstName-${index}`) as HTMLInputElement;
    const middleNameInput = document.getElementById(`middleName-${index}`) as HTMLInputElement;
    const lastNameInput = document.getElementById(`lastName-${index}`) as HTMLInputElement;
    const emailInput = document.getElementById(`email-${index}`) as HTMLInputElement;
    const phoneNumberInput = document.getElementById(`phoneNumber-${index}`) as HTMLInputElement;
    const roleInput = document.getElementById(`role-${index}`) as HTMLInputElement;
    const addressInput = document.getElementById(`address-${index}`) as HTMLInputElement;
    updatedUser.firstName = firstNameInput.value;
    updatedUser.middleName = middleNameInput.value;
    updatedUser.lastName = lastNameInput.value;
    updatedUser.email = emailInput.value;
    updatedUser.phoneNumber = phoneNumberInput.value;
    updatedUser.role = roleInput.value as Role;
    updatedUser.address = addressInput.value;
    await updateUser(updatedUser.id, updatedUser)

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = updatedUser;
      return updatedUsers;
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    await deleteUser(users[index].id)
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const handleRefresh = () => {
    getUsers().then(user => {
      setUsers(user);
    })
  };

  const handleCreate = async () => {
      const createdUser = await createUser(newUser);
      setUsers(prevUsers => [...prevUsers, createdUser]);
      setNewUser({
        id:0,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: Role.Subscriber,
        address: '',
      });
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Data</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Address</th>
            <th>Created On</th>
            <th>Modified On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.firstName} id={`firstName-${index}`} />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.middleName} id={`middleName-${index}`} />
                ) : (
                  user.middleName
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.lastName} id={`lastName-${index}`} />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.email} id={`email-${index}`} />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.phoneNumber} id={`phoneNumber-${index}`} />
                ) : (
                  user.phoneNumber
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.role} id={`role-${index}`} />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" defaultValue={user.address} id={`address-${index}`} />
                ) : (
                  user.address
                )}
              </td>
              <td>{user.createdOn?.toLocaleString()}</td>
              <td>{user.modifiedOn?.toLocaleString()}</td>
              <td>
                {editingIndex === index ? (
                  <div>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Create User</h2>
      <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={newUser.firstName} onChange={(e) => setNewUser({...newUser, firstName: e.target.value})} />
        </div><div>
            <label htmlFor="middleName">Middle Name:</label>
            <input type="text" id="middleName" value={newUser.middleName} onChange={(e) => setNewUser({...newUser, middleName: e.target.value})} />
          </div><div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={newUser.lastName} onChange={(e) => setNewUser({...newUser, lastName: e.target.value})} />
          </div><div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
          </div><div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" value={newUser.phoneNumber} onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value})} />
          </div><div>
            <label htmlFor="role">Role:</label>
            <select id="role" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value as Role})}>
              <option value={Role.Subscriber}>Subscriber</option>
              <option value={Role.Admin}>Admin</option>
              <option value={Role.SuperAdmin}>SuperAdmin</option>
            </select>
          </div><div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={newUser.address} onChange={(e) => setNewUser({...newUser, address: e.target.value})} />
          </div>
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
};

export default UserTable;