import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host = environment.host;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(loginReq: Login) {
    return this.httpClient.post(`${this.host}/auth/login`, loginReq);
  }

  public register(user) {
    return this.httpClient.post(`${this.host}/auth/register`, user);
  }

  public getProfile() {
    let head = this.header.append('Authorization', this.getTokenHeader());
    return this.httpClient.get<User>(`${this.host}/auth/profile`, { headers: head });
  }

  public isLogin() {
    return !!this.getToken();
  }

  public getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getTokenHeader() {
    return `Bearer ${this.getToken()}`;
  }

  public storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  public removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
