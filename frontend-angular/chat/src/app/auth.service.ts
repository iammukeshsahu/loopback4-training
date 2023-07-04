// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';

const localAuthUrl = environment.AUTH_BASE_URL + `auth/login-token`;
const googleAuthUrl = environment.AUTH_BASE_URL + `auth/google`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  public token = '';
  createAuthorizationHeader(headers: HttpHeaders, token: string) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  login(username: string, password: string) {
    console.log('username :>> ', username);
    console.log('password :>> ', password);
    return this.http.post<{code: string}>(localAuthUrl, {
      username: 'john.doe@example.com',
      password: 'test123!@#',
      client_id: 'temp_client',
      client_secret: 'temp_secret',
    });
  }

  oAuthLogin(url: string) {
    const myform = document.createElement('form');
    const body = {
      client_id: 'temp_client',
      client_secret: 'temp_secret',
    };
    myform.method = 'POST';
    myform.action = url;
    myform.style.display = 'none';
    myform.append('Content-Type', 'application/x-www-form-urlencoded');
    Object.keys(body).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.value = (body as any)[key]; //NOSONAR
      myform.appendChild(input);
    });
    document.body.appendChild(myform);
    myform.submit();
  }

  loginViaGoogle() {
    this.oAuthLogin(googleAuthUrl);
  }
}
