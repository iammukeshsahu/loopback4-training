import {
    post,
    get,
    requestBody,
    response,
  } from '@loopback/rest'
import { Users } from '../models/communicate.model'
import axios from 'axios';

const baseUrl = process.env.CROSS_SERVICE_BASE_URL

export class MyController {
  @get('/users')
  async getData(): Promise<any> {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  }

  @post('/users')
  @response(204, {
    description: 'Users created successfully'
  })
  async createUsers(@requestBody() data: Users): Promise<any> {
    const response = await axios.post(`${baseUrl}/users`, data);

    return response.data;
  }
}
