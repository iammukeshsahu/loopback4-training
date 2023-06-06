import React, { useState } from 'react';

interface User {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: string;
  address?: string;
  createdOn?: string;
  modifiedOn?: string;
}

class UserTableData implements User {
  constructor(
    public firstName: string,
    public email: string,
    public role: string,
    public middleName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public address?: string,
    public createdOn?: string,
    public modifiedOn?: string
  ) {}
}

const initialData: User[] = [
  new UserTableData('Akshay', 'akshay@example.com', 'Admin'),
  new UserTableData('Rahul', 'rahul@example.com', 'User'),
  new UserTableData('Ravi', 'ravi@example.com', 'Admin'),
  new UserTableData('Rohan', 'rohan@example.com', 'User'),
  new UserTableData('Nakul', 'nakul@example.com', 'Admin'),
  new UserTableData('Sandeep', 'sandeep@example.com', 'User'),
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

const handleSave = (index: number) => {
  setEditingIndex(null);

  setUsers((prevUsers) => {
    const updatedUsers = [...prevUsers];
    const updatedUser = { ...updatedUsers[index] };

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
    updatedUser.role = roleInput.value;
    updatedUser.address = addressInput.value;

    updatedUsers[index] = updatedUser;
    return updatedUsers;
  });
};

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const handleRefresh = () => {
    // Refresh the user data
    setUsers(initialData)
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
              <td>{user.createdOn}</td>
              <td>{user.modifiedOn}</td>
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
    </div>
  );
};

export default UserTable;
