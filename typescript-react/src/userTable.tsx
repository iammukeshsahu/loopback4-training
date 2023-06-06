import React, { useState } from 'react';

// Date Time Formatter Decorator
const DateTimeFormatter = (target: any, propertyKey: string): void => {
  
  let value = target[propertyKey];

  const getter = () => {
    const date = new Date(value);
    return date.toLocaleString();
  };

  const setter = (newValue: any) => {
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber'
}

interface CrudActions<T> {
  create(value: T): void,
  read(): T[],
  update(index: number, value: T): void,
  delete(index: number): void
}
interface User {
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

class UserTableData implements User {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  address?: string;

  @DateTimeFormatter
  createdOn?: Date;

  @DateTimeFormatter
  modifiedOn?: Date;

  constructor(data: User) {
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.role = data.role;
    this.address = data.address;
    this.createdOn = data.createdOn;
    this.modifiedOn = data.modifiedOn;
  }
}


class userCrud<T> implements CrudActions<T> {
  private value: T[];

  constructor() {
    this.value = [];
  }

  create(item: T): void {
    this.value.push(item);
  }

  read(): T[] {
    return this.value;
  }

  update(index: number, item: T): void {
    this.value[index] = item;
  }

  delete(index: number): void {
    this.value.splice(index, 1);
  }
}

const initialData: User[] = [
  {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: Role.Admin,
      createdOn: new Date()
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      role: Role.Subscriber,
      createdOn: new Date()
    },
]

const userCrudOperations = new userCrud<User>();
initialData.forEach((userData) => userCrudOperations.create(new UserTableData(userData)));

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
    updatedUser.role = roleInput.value as Role;
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
    </div>
  );
};

export default UserTable;