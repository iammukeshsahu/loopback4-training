import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Update with your LoopBack 4 API URL

// Define the API functions for users
enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber'
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

// Get all users
export async function getUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

// Create a user
export async function createUser(user: User) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get a user by ID
export async function getUserById(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving user with ID ${id}:`, error);
    throw error;
  }
}

// Update a user by ID
export async function updateUser(id: number, updatedUser: User) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
}

// Delete a user by ID
export async function deleteUser(id: number) {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}
